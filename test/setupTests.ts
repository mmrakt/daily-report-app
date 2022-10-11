import '@testing-library/jest-dom/extend-expect'
import fetch from 'node-fetch'
import { loadEnvConfig } from '@next/env'

if (!globalThis.fetch) {
    globalThis.fetch = fetch
}
