import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes from the default and persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<string>('greeting', 'hello'));
    expect(result.current[0]).toBe('hello');

    act(() => {
      result.current[1]('world');
    });

    expect(result.current[0]).toBe('world');
    expect(localStorage.getItem('greeting')).toBe(JSON.stringify('world'));
  });

  it('reads an existing value already in localStorage', () => {
    localStorage.setItem('count', JSON.stringify(42));
    const { result } = renderHook(() => useLocalStorage<number>('count', 0));
    expect(result.current[0]).toBe(42);
  });
});
