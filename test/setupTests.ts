import '@testing-library/jest-dom'

import fetch from 'node-fetch'
import { loadEnvConfig } from '@next/env'

if (!globalThis.fetch) {
    globalThis.fetch = fetch
}

loadEnvConfig(process.cwd())
