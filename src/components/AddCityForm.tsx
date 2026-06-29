import { useState } from 'react';
import Card from './Card';
import { searchCity } from '../lib/openMeteo';
import { useSettings } from '../context/settingsContext';

interface FormValues {
  name: string;
  label: string;
}

interface FormErrors {
  name?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  if (name.length === 0) {
    errors.name = 'City name is required.';
  } else if (name.length < 2) {
    errors.name = 'Enter at least 2 characters.';
  }
  return errors;
}

export default function AddCityForm() {
  const { addCity } = useSettings();
  const [values, setValues] = useState<FormValues>({ name: '', label: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState<string | null>(null);

  // Single change handler using computed property names.
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as the user corrects it.
    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: undefined }));
      setNotFound(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.name) return;

    const query = values.name.trim();
    setSearching(true);
    setNotFound(null);
    try {
      const results = await searchCity(query);
      if (results.length === 0) {
        setNotFound(`No city found for "${query}". Try a different name.`);
      } else {
        addCity({ ...results[0], label: values.label.trim() || undefined });
        setValues({ name: '', label: '' });
      }
    } catch {
      setNotFound(`No city found for "${query}". Try a different name.`);
    } finally {
      setSearching(false);
    }
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Add a city</h2>
      <form onSubmit={handleSubmit} noValidate className="mt-3 grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-start">
        {/* City name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            City name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Search a city, e.g. London"
            aria-invalid={Boolean(errors.name)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Label (optional) */}
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-slate-700">
            Label
          </label>
          <input
            id="label"
            name="label"
            value={values.label}
            onChange={handleChange}
            placeholder="Optional nickname, e.g. Home"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Submit */}
        <div className="sm:pt-6">
          <button
            type="submit"
            disabled={searching}
            className="w-full rounded-lg bg-sky-500 px-4 py-2 font-medium text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {searching ? 'Searching…' : 'Add city'}
          </button>
        </div>
      </form>

      {notFound && <p className="text-sm text-red-600 mt-3">{notFound}</p>}
    </Card>
  );
}
