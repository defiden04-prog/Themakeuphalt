import { render, screen } from '@testing-library/react'
import FaceScanPage from './page'

jest.mock('@/components/scan-flow/flow-orchestrator', () => ({
  FlowOrchestrator: () => <div data-testid="flow-orchestrator">Flow Orchestrator Mock</div>
}))

describe('Face Scan Page', () => {
  it('renders the back link and logo', () => {
    render(<FaceScanPage />)
    
    expect(screen.getByText(/Back to Home/i)).toBeInTheDocument()
    expect(screen.getByText(/THE MAKEUP HALT/i)).toBeInTheDocument()
    expect(screen.getByTestId('flow-orchestrator')).toBeInTheDocument()
  })
})
