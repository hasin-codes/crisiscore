// Missing Person Reports Data
export const missingPersonsData = [
  {
    id: "mp-001",
    fullName: "John Doe",
    gender: "male",
    dateOfBirth: "1990-05-15",
    height: 175,
    weight: 70,
    lastSeenLocation: "Central Park",
    lastSeenDateTime: "2024-03-15T14:30:00Z",
    clothingDescription: "Blue jeans, red t-shirt, black jacket",
    medicalConditions: "Diabetes",
    distinguishingFeatures: "Scar on left cheek, tribal tattoo on right arm",
    status: "active",
    reportedBy: "Jane Doe",
    reportedAt: "2024-03-15T15:00:00Z",
    updatedAt: "2024-03-15T15:00:00Z"
  }
] as const;

// Emergency Service Status Data
export const emergencyServicesData = [
  {
    id: "es-001",
    name: "Fire Department",
    status: "Available",
    responseTime: "5 mins",
    activeUnits: 8,
    totalUnits: 10,
    currentIncidents: 2,
    lastUpdated: "2024-03-15T15:00:00Z"
  },
  {
    id: "es-002",
    name: "Police",
    status: "High Demand",
    responseTime: "15 mins",
    activeUnits: 15,
    totalUnits: 20,
    currentIncidents: 8,
    lastUpdated: "2024-03-15T15:00:00Z"
  },
  {
    id: "es-003",
    name: "Ambulance",
    status: "Available",
    responseTime: "8 mins",
    activeUnits: 12,
    totalUnits: 15,
    currentIncidents: 4,
    lastUpdated: "2024-03-15T15:00:00Z"
  },
  {
    id: "es-004",
    name: "Hospital",
    status: "High Demand",
    bedCapacity: {
      total: 200,
      occupied: 150,
      available: 50
    },
    lastUpdated: "2024-03-15T15:00:00Z"
  }
] as const;

// Emergency Shelter Data
export const shelterData = [
  {
    id: "sh-001",
    name: "Shelter A",
    capacity: {
      total: 500,
      current: 375,
      percentage: 75
    },
    resources: {
      food: {
        status: "Sufficient for 3 days",
        level: "sufficient",
        quantity: "500 kg"
      },
      water: {
        status: "Sufficient for 5 days",
        level: "sufficient",
        quantity: "1000 L"
      },
      medicalSupplies: {
        status: "Limited",
        level: "limited",
        quantity: "50 kits"
      },
      blankets: {
        status: "Adequate",
        level: "sufficient",
        quantity: "200"
      }
    },
    transport: {
      buses: {
        available: 5,
        total: 8
      },
      pickupPoints: {
        active: 3,
        total: 5,
        locations: ["North Station", "South Mall", "East Park"]
      },
      nextDeparture: "2024-03-15T16:00:00Z"
    },
    updatedAt: "2024-03-15T15:00:00Z"
  }
] as const;

// Infrastructure Status Data
export const infrastructureData = {
  electricity: {
    status: "Available",
    capacity: 95,
    maintenanceScheduled: false,
    lastUpdated: "2024-03-15T15:00:00Z"
  },
  gas: {
    status: "Available",
    pressure: 98,
    maintenanceScheduled: false,
    lastUpdated: "2024-03-15T15:00:00Z"
  },
  water: {
    status: "Limited",
    supply: 65,
    maintenanceScheduled: true,
    scheduledMaintenance: "2024-03-16T10:00:00Z",
    lastUpdated: "2024-03-15T15:00:00Z"
  },
  shelter: {
    status: "Ready",
    occupancy: 45,
    capacity: 100,
    lastUpdated: "2024-03-15T15:00:00Z"
  }
} as const;

// Volunteer Data
export const volunteerData = [
  {
    id: "vol-001",
    personalInfo: {
      fullName: "John Smith",
      dateOfBirth: "1985-08-20",
      gender: "male",
      phone: "123-456-7890",
      email: "john.smith@email.com",
      address: "123 Main St, City, Country"
    },
    emergencyContact: {
      name: "Jane Smith",
      relationship: "spouse",
      phone: "098-765-4321"
    },
    availability: {
      days: "weekdays",
      location: "Central District",
      willingToTravel: true,
      maxTravelDistance: 50
    },
    skills: {
      professionalBackground: "healthcare",
      experience: "5 years as emergency room nurse",
      skillsList: {
        firstAid: true,
        counseling: true,
        cooking: false,
        driving: true,
        repairs: false,
        logistics: true,
        other: ["Emergency Response", "Crisis Management"]
      }
    },
    health: {
      status: "excellent",
      conditions: "",
      allergies: "None"
    },
    agreements: {
      backgroundCheck: true,
      liability: true,
      privacy: true
    },
    status: "active",
    registeredAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-15T15:00:00Z"
  }
] as const;

// Resource Requests Data
export const resourceRequestsData = [
  {
    id: "rr-001",
    type: "Medical Assistance",
    urgency: "High",
    requester: "Sarah Connor",
    location: "456 Pine St",
    details: "Elderly patient needs medical attention",
    status: "pending",
    requestedAt: "2024-03-15T14:30:00Z"
  },
  {
    id: "rr-002",
    type: "Food Supply",
    urgency: "Medium",
    requester: "James Bond",
    location: "789 Oak Ave",
    details: "Family of 4 needs food supplies",
    status: "in-progress",
    requestedAt: "2024-03-15T13:45:00Z"
  }
] as const; 