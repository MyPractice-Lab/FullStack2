import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-router-dom',
      'react-bootstrap/Alert',
      'react-bootstrap/Badge',
      'react-bootstrap/Button',
      'react-bootstrap/Card',
      'react-bootstrap/Col',
      'react-bootstrap/Container',
      'react-bootstrap/Form',
      'react-bootstrap/InputGroup',
      'react-bootstrap/ListGroup',
      'react-bootstrap/Nav',
      'react-bootstrap/NavDropdown',
      'react-bootstrap/Navbar',
      'react-bootstrap/Row',
      'react-bootstrap/Table',
    ],
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unitarias',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.js'],
          include: ['src/**/*.test.jsx', 'src/**/*.test.js'],
        },
      },
      {
        extends: true,
        test: {
          name: 'funcionales',
          globals: true,
          include: ['src/**/*.funcional.jsx'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
