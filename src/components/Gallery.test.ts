// @vitest-environment jsdom
import { createElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Gallery from './Gallery';
import photos from '../data/photos.json';
afterEach(cleanup);
describe('circuit photo selection',()=>{
 it('shows highlights and expands the original collection',()=>{
  render(createElement(Gallery,{activeAlbum:'all'}));
  expect(screen.getAllByRole('button',{name:/Open photograph/})).toHaveLength(12);
  fireEvent.click(screen.getByRole('button',{name:/View the full collection/}));
  expect(screen.getAllByRole('button',{name:/Open photograph/})).toHaveLength(photos.length);
 });
 it('limits a circuit selection to its own photographs',()=>{
  render(createElement(Gallery,{activeAlbum:'pacific'}));
  expect(screen.getAllByRole('button',{name:/Open photograph/})).toHaveLength(photos.filter(p=>p.album==='pacific').length);
 });
 it('does not present other circuits as The Ridge',()=>{
  render(createElement(Gallery,{activeAlbum:'ridge'}));
  expect(screen.queryAllByRole('button',{name:/Open photograph/})).toHaveLength(0);
  expect(screen.getByText(/Photos from The Ridge/)).toBeTruthy();
 });
});
