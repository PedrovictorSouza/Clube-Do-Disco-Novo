import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  it('deve renderizar com progresso 0', () => {
    render(<ProgressBar progress={0} />);
    
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveStyle('width: 0%');
  });

  it('deve renderizar com progresso 50%', () => {
    render(<ProgressBar progress={0.5} />);
    
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('deve renderizar com progresso 100%', () => {
    render(<ProgressBar progress={1} />);
    
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveStyle('width: 100%');
  });

  it('deve limitar progresso entre 0 e 1', () => {

    const { rerender } = render(<ProgressBar progress={-0.5} />);
    let progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveStyle('width: 0%');

    rerender(<ProgressBar progress={1.5} />);
    progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveStyle('width: 100%');
  });

  it('deve aplicar className customizada', () => {
    render(<ProgressBar progress={0.5} className="custom-class" />);
    
    const container = screen.getByRole('progressbar', { hidden: true }).parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('deve renderizar o container', () => {
    render(<ProgressBar progress={0.5} />);
    
    const container = screen.getByRole('progressbar', { hidden: true }).parentElement;
    expect(container).toBeInTheDocument();
  });
});
