/**
 * Hand-rolled composition primitive. Renders {children} inside the standard
 * card chrome; an optional `className` is merged onto the wrapper.
 */
export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        'bg-white rounded-2xl shadow-sm border border-slate-200 p-4 ' + className
      }
    >
      {children}
    </div>
  );
}
