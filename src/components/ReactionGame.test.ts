// @vitest-environment jsdom
import { createElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import ReactionGame from './ReactionGame';

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(0);
  vi.spyOn(performance, 'now').mockReturnValue(0);
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

function start() {
  render(createElement(ReactionGame));
  fireEvent.click(screen.getByRole('button', { name: /Start the lights/ }));
}
function lightsOut() { act(() => { vi.advanceTimersByTime(3800); }); }

describe('five-light reaction game', () => {
  it('illuminates five lights, then measures the response and retains the best this visit', () => {
    start();
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.getByLabelText('5 of 5 red lights illuminated')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(800); });
    vi.mocked(performance.now).mockReturnValue(230);
    fireEvent.click(screen.getByRole('button', { name: /GO!/ }));
    expect(screen.getByText('0.230')).toBeTruthy();
    expect(screen.getByText('Best this visit: 0.230 s')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Go again/ }));
    lightsOut();
    vi.mocked(performance.now).mockReturnValue(630);
    fireEvent.click(screen.getByRole('button', { name: /GO!/ }));
    expect(screen.getByText('0.400')).toBeTruthy();
    expect(screen.getByText('Best this visit: 0.230 s')).toBeTruthy();
  });
  it('rejects jump starts and cancels the old countdown before retrying', () => {
    start();
    act(() => { vi.advanceTimersByTime(1000); });
    fireEvent.click(screen.getByRole('button', { name: /Wait for lights out/ }));
    expect(screen.getByText('Too soon.')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(10000); });
    expect(screen.queryByRole('button', { name: /GO!/ })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Jump start/ }));
    lightsOut();
    expect(screen.getByRole('button', { name: /GO!/ })).toBeTruthy();
  });
  it('supports the keyboard without accepting held-key repeats', () => {
    render(createElement(ReactionGame));
    const button=screen.getByRole('button', { name: /Start the lights/ });
    fireEvent.keyDown(button, {key:' '});
    fireEvent.keyDown(button, {key:' ', repeat:true});
    expect(screen.queryByText('Too soon.')).toBeNull();
    lightsOut();
    vi.mocked(performance.now).mockReturnValue(180);
    fireEvent.keyDown(button, {key:' '});
    expect(screen.getByText('0.180')).toBeTruthy();
  });
  it('cleans up countdown timers on unmount', () => {
    const {unmount}=render(createElement(ReactionGame));
    fireEvent.click(screen.getByRole('button', {name:/Start the lights/}));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
