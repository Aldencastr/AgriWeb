// jest.setup.cjs - Simple CommonJS setup for Jest

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, ...props }) {
    const React = require('react')
    return React.createElement('img', { src, alt, ...props })
  },
}))

// Mock lucide-react icons - simple version
const lucideIcons = [
  'Menu', 'X', 'Sun', 'Moon', 'Sprout', 'Music', 'ChevronLeft', 'ChevronRight',
  'ChevronDown', 'ChevronUp', 'Download', 'ExternalLink', 'CheckCircle2', 'Loader2',
  'Sparkles', 'ArrowRight', 'Calendar', 'BookOpen', 'MessageCircle', 'Users',
  'Clock', 'MapPin', 'Mail', 'Phone', 'Send', 'Brain', 'Zap', 'Droplets', 'Cpu',
  'Map', 'Leaf', 'BarChart3', 'Target', 'Award', 'FlaskConical', 'Briefcase',
  'Share2', 'AlertCircle', 'Info', 'Search', 'Shuffle', 'GraduationCap', 'Trash2',
  'Edit', 'Eye', 'EyeOff', 'Plus', 'Minus', 'Star', 'Heart', 'Share', 'Link',
  'Filter', 'Settings', 'Home', 'User', 'LogIn', 'LogOut', 'RefreshCw', 'RotateCcw',
  'Copy', 'FileText', 'Image', 'Video', 'Music2', 'Code', 'Terminal', 'Database',
  'Server', 'Cloud', 'Wifi', 'Signal', 'Battery', 'HardDrive', 'Monitor',
  'Smartphone', 'Tablet', 'Printer', 'Camera', 'Mic', 'Volume2', 'VolumeX',
  'Play', 'Pause', 'Stop', 'SkipForward', 'SkipBack', 'FastForward', 'Rewind',
  'Repeat', 'Shuffle', 'Heart', 'Star', 'Flag', 'Bookmark', 'Tag', 'Archive',
  'Trash2', 'Edit', 'Save', 'Download', 'Upload', 'Share', 'Link', 'ExternalLink',
  'Mail', 'MessageSquare', 'Send', 'Phone', 'MapPin', 'Clock', 'Calendar', 'User',
  'Users', 'Settings', 'HelpCircle', 'AlertCircle', 'Info', 'CheckCircle', 'XCircle',
  'PlusCircle', 'MinusCircle', 'AlertTriangle', 'Check', 'X', 'ChevronUp', 'ChevronDown',
  'ChevronLeft', 'ChevronRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
]

jest.mock('lucide-react', function() {
  var mockIcons = {}
  lucideIcons.forEach(function(name) {
    mockIcons[name] = function(props) {
      var React = require('react')
      return React.createElement('svg', { 'data-testid': name.toLowerCase(), ...props })
    }
  })
  return mockIcons
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(function(query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }
  }),
})

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(function() {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(function() {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }
})

// Mock localStorage
var localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
var sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock