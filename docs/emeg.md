EMERGENCY PAGE DATA STRUCTURE AND IMPLEMENTATION GUIDE

1. Missing Person Reports Data Structure
code -
interface MissingPerson {
  id: string           // Format: "mp-{number}"
  fullName: string
  gender: "male" | "female" | "non-binary" | "other"
  dateOfBirth: string  // ISO date
  height: number       // in cm
  weight: number       // in kg
  lastSeenLocation: string
  lastSeenDateTime: string  // ISO datetime
  clothingDescription: string
  medicalConditions: string
  distinguishingFeatures: string
  status: "active" | "found" | "resolved"
  reportedBy: string
  reportedAt: string   // ISO datetime
  updatedAt: string    // ISO datetime
}

2. Emergency Services Data Structure
code -
interface EmergencyService {
  id: string           // Format: "es-{number}"
  name: string         // e.g., "Fire Department", "Police", "Ambulance", "Hospital"
  status: "Available" | "High Demand"
  responseTime?: string // e.g., "5 mins"
  activeUnits?: number
  totalUnits?: number
  currentIncidents?: number
  bedCapacity?: {      // Only for hospitals
    total: number
    occupied: number
    available: number
  }
  lastUpdated: string  // ISO datetime
}

3. Emergency Shelter Data Structure
code -
interface Shelter {
  id: string           // Format: "sh-{number}"
  name: string
  capacity: {
    total: number
    current: number
    percentage: number
  }
  resources: {
    food: ResourceStatus
    water: ResourceStatus
    medicalSupplies: ResourceStatus
    blankets: ResourceStatus
  }
  transport: {
    buses: {
      available: number
      total: number
    }
    pickupPoints: {
      active: number
      total: number
      locations: string[]
    }
    nextDeparture: string  // ISO datetime
  }
  updatedAt: string    // ISO datetime
}

interface ResourceStatus {
  status: string       // e.g., "Sufficient for 3 days"
  level: "critical" | "limited" | "sufficient"
  quantity: string     // e.g., "500 kg", "1000 L"
}

4. Infrastructure Status Data Structure
code -
interface InfrastructureStatus {
  electricity: UtilityStatus
  gas: UtilityStatus
  water: WaterStatus
  shelter: ShelterStatus
}

interface UtilityStatus {
  status: "Available" | "Limited" | "Unavailable"
  capacity?: number    // percentage
  pressure?: number    // percentage
  maintenanceScheduled: boolean
  lastUpdated: string  // ISO datetime
}

interface WaterStatus extends UtilityStatus {
  supply: number       // percentage
  scheduledMaintenance?: string  // ISO datetime
}

interface ShelterStatus {
  status: "Ready" | "Limited" | "Full"
  occupancy: number    // percentage
  capacity: number     // total capacity
  lastUpdated: string  // ISO datetime
}

5. Volunteer Data Structure
code -
interface Volunteer {
  id: string           // Format: "vol-{number}"
  personalInfo: {
    fullName: string
    dateOfBirth: string  // ISO date
    gender: "male" | "female" | "non-binary" | "prefer-not-to-say"
    phone: string
    email?: string
    address: string
  }
  emergencyContact: {
    name: string
    relationship: "parent" | "sibling" | "spouse" | "friend" | "other"
    phone: string
  }
  availability: {
    days: "weekdays" | "weekends" | "all"
    location: string
    willingToTravel: boolean
    maxTravelDistance?: number  // in km
  }
  skills: {
    professionalBackground: "healthcare" | "engineering" | "logistics" | "other"
    experience: string
    skillsList: {
      firstAid: boolean
      counseling: boolean
      cooking: boolean
      driving: boolean
      repairs: boolean
      logistics: boolean
      other?: string[]
    }
  }
  health: {
    status: "excellent" | "good" | "moderate"
    conditions?: string
    allergies?: string
  }
  agreements: {
    backgroundCheck: boolean
    liability: boolean
    privacy: boolean
  }
  status: "active" | "pending" | "approved" | "inactive"
  registeredAt: string  // ISO datetime
  updatedAt: string     // ISO datetime
}

6. Resource Requests Data Structure
code -
interface ResourceRequest {
  id: string           // Format: "rr-{number}"
  type: string         // e.g., "Medical Assistance", "Food Supply"
  urgency: "High" | "Medium" | "Low"
  requester: string
  location: string
  details: string
  status: "pending" | "in-progress" | "resolved"
  requestedAt: string  // ISO datetime
}

7. Update Frequency Requirements
- Missing Person Reports: Real-time updates
- Emergency Services: Real-time updates
- Shelter Resources: Every 15 minutes
- Infrastructure Status: Every 5 minutes
- Volunteer Data: Real-time for new registrations, hourly for status updates
- Resource Requests: Real-time updates

8. Data Validation Rules
- All IDs must follow their specific format patterns
- All dates must be in ISO format
- Status fields must match their defined string literals
- Percentage values must be between 0 and 100
- Required fields cannot be null or undefined
- Phone numbers must match the format: XXX-XXX-XXXX
- Email addresses must be valid format

9. Security Requirements
- Encrypt all personal information in transit and at rest
- Implement role-based access control
- Log all data modifications with user ID and timestamp
- Regular data backups (every 6 hours)
- Rate limit API endpoints
- Validate all input data against XSS and injection attacks

10. API Integration Notes
- Use WebSocket for real-time updates
- Implement retry mechanism with exponential backoff
- Cache non-critical data for 5 minutes
- Use pagination for lists (20 items per page)
- Include ETags for caching
- Implement request debouncing (500ms)