import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    expect(screen.getAllByText(/THE MAKEUP HALT/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Elevate/i)).toBeInTheDocument()
  })
})
