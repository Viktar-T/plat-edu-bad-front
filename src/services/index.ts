// Barrel export for services
export {};

// Equipment service functions
export const equipmentService = {
  /**
   * Fetch equipment details by ID
   */
  async getEquipmentDetail(id: string): Promise<import('../types').EquipmentDetail> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data based on equipment ID
    const equipmentData = getMockEquipmentData(id);
    
    if (!equipmentData) {
      throw new Error(`Equipment with ID ${id} not found`);
    }
    
    return equipmentData;
  },

  /**
   * Fetch historical data for equipment
   */
  async getHistoricalData(id: string, hours: number = 24): Promise<import('../types').HistoricalData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return generateMockHistoricalData(id, hours);
  },

  /**
   * Send control command to equipment
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendControlCommand(_equipmentId: string, _controlId: string, _value: string | number | boolean): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success/failure
    return Math.random() > 0.1; // 90% success rate
  }
};

/**
 * Mock equipment data based on ID
 */
function getMockEquipmentData(id: string): import('../types').EquipmentDetail | null {
  const equipmentMap: Record<string, import('../types').EquipmentDetail> = {
    '1.1.1': {
      id: '1.1.1',
      name: 'PV Hulajnogi System',
      type: 'Solar Panel System',
      location: 'First Floor - North Wing',
      status: 'online',
      description: 'Advanced solar panel system designed for electric scooter charging station. Features high-efficiency photovoltaic cells with integrated monitoring and control systems.',
      photoPath: '/src/assets/1.1.1 PV-Hulajnogi.jpg',
      installationDate: '2024-01-15',
      manufacturer: 'SolarTech Industries',
      model: 'ST-PV-1000W',
      serialNumber: 'ST-PV-2024-001',
      data: {
        timestamp: new Date().toISOString(),
        voltage: 48.2,
        current: 20.8,
        power: 1002.6,
        temperature: 42.3,
        efficiency: 94.2
      },
      specifications: [
        { name: 'Rated Power', value: 1000, unit: 'W', category: 'Power' },
        { name: 'Rated Voltage', value: 48, unit: 'V', category: 'Electrical' },
        { name: 'Rated Current', value: 20.8, unit: 'A', category: 'Electrical' },
        { name: 'Efficiency', value: 94.2, unit: '%', category: 'Performance' },
        { name: 'Temperature Coefficient', value: -0.4, unit: '%/°C', category: 'Performance' },
        { name: 'Operating Temperature', value: '-40 to 85', unit: '°C', category: 'Environmental' }
      ],
      technicalSpecs: [
        { name: 'Cell Type', value: 'Monocrystalline Silicon', description: 'High-efficiency monocrystalline cells' },
        { name: 'Cell Count', value: 144, description: 'Number of photovoltaic cells' },
        { name: 'Module Dimensions', value: '1650 x 992 x 35', unit: 'mm', description: 'Length x Width x Height' },
        { name: 'Weight', value: 18.5, unit: 'kg', description: 'Module weight' },
        { name: 'Frame Material', value: 'Anodized Aluminum', description: 'Corrosion-resistant frame' },
        { name: 'Junction Box', value: 'IP67 Rated', description: 'Water and dust resistant', isAdvanced: true },
        { name: 'Bypass Diodes', value: 3, description: 'Number of bypass diodes for shading protection', isAdvanced: true },
        { name: 'Maximum System Voltage', value: 1000, unit: 'V', description: 'Maximum DC system voltage', isAdvanced: true }
      ],
      controls: [
        {
          id: 'emergency_shutdown',
          name: 'Emergency Shutdown',
          type: 'button',
          value: false,
          enabled: true,
          description: 'Immediately shut down the solar panel system for safety'
        },
        {
          id: 'maintenance_mode',
          name: 'Maintenance Mode',
          type: 'toggle',
          value: false,
          enabled: true,
          description: 'Enable maintenance mode to reduce power output'
        }
      ],
      relatedEquipment: ['1.1.2']
    },
    '1.1.2': {
      id: '1.1.2',
      name: 'PV Hulajnogi Converter',
      type: 'Power Converter',
      location: 'First Floor - North Wing',
      status: 'online',
      description: 'High-efficiency DC-DC converter system for solar panel integration. Converts variable DC voltage from solar panels to stable DC voltage for battery charging.',
      photoPath: '/src/assets/1.1.2 PV-Hulajnogi-converter.jpg',
      installationDate: '2024-01-15',
      manufacturer: 'PowerConvert Solutions',
      model: 'PC-DC-1000W',
      serialNumber: 'PC-DC-2024-001',
      data: {
        timestamp: new Date().toISOString(),
        inputVoltage: 48.2,
        outputVoltage: 24.0,
        inputCurrent: 20.8,
        outputCurrent: 41.7,
        efficiency: 96.8,
        temperature: 38.5
      },
      specifications: [
        { name: 'Input Power', value: 1000, unit: 'W', category: 'Power' },
        { name: 'Input Voltage Range', value: '30-60', unit: 'V', category: 'Electrical' },
        { name: 'Output Voltage', value: 24, unit: 'V', category: 'Electrical' },
        { name: 'Efficiency', value: 96.8, unit: '%', category: 'Performance' },
        { name: 'Operating Temperature', value: '-20 to 70', unit: '°C', category: 'Environmental' },
        { name: 'Protection Class', value: 'IP65', category: 'Environmental' }
      ],
      technicalSpecs: [
        { name: 'Topology', value: 'Buck-Boost Converter', description: 'DC-DC conversion topology' },
        { name: 'Switching Frequency', value: 200, unit: 'kHz', description: 'Internal switching frequency' },
        { name: 'Dimensions', value: '200 x 150 x 80', unit: 'mm', description: 'Length x Width x Height' },
        { name: 'Weight', value: 2.1, unit: 'kg', description: 'Converter weight' },
        { name: 'Cooling Method', value: 'Natural Convection', description: 'Passive cooling system' },
        { name: 'Protection Features', value: 'OVP, OCP, OTP, SCP', description: 'Over-voltage, over-current, over-temperature, short-circuit protection', isAdvanced: true },
        { name: 'Communication Protocol', value: 'Modbus RTU', description: 'RS485 communication interface', isAdvanced: true },
        { name: 'Isolation Voltage', value: 3000, unit: 'V', description: 'Input-output isolation voltage', isAdvanced: true }
      ],
      controls: [
        {
          id: 'output_voltage',
          name: 'Output Voltage',
          type: 'slider',
          value: 24.0,
          min: 20.0,
          max: 28.0,
          step: 0.1,
          enabled: true,
          description: 'Adjust output voltage level'
        },
        {
          id: 'enable_converter',
          name: 'Enable Converter',
          type: 'toggle',
          value: true,
          enabled: true,
          description: 'Enable or disable the converter'
        }
      ],
      relatedEquipment: ['1.1.1']
    },
    '2.1.1': {
      id: '2.1.1',
      name: 'Wind Big Vertical Turbine',
      type: 'Wind Turbine',
      location: 'First Floor - East Wing',
      status: 'online',
      description: 'Large vertical axis wind turbine for energy generation. Features innovative blade design for optimal performance in variable wind conditions.',
      photoPath: '/src/assets/2.1.1. Wind-Big-Vertical.jpg',
      installationDate: '2024-02-10',
      manufacturer: 'WindPower Technologies',
      model: 'WP-VAWT-2000W',
      serialNumber: 'WP-VAWT-2024-001',
      data: {
        timestamp: new Date().toISOString(),
        windSpeed: 8.5,
        rpm: 120,
        voltage: 48.0,
        current: 41.7,
        power: 2000.0,
        temperature: 25.2
      },
      specifications: [
        { name: 'Rated Power', value: 2000, unit: 'W', category: 'Power' },
        { name: 'Rated Wind Speed', value: 12, unit: 'm/s', category: 'Wind' },
        { name: 'Cut-in Wind Speed', value: 2.5, unit: 'm/s', category: 'Wind' },
        { name: 'Cut-out Wind Speed', value: 25, unit: 'm/s', category: 'Wind' },
        { name: 'Rotor Diameter', value: 3.2, unit: 'm', category: 'Physical' },
        { name: 'Tower Height', value: 8.0, unit: 'm', category: 'Physical' }
      ],
      technicalSpecs: [
        { name: 'Turbine Type', value: 'Vertical Axis Wind Turbine (VAWT)', description: 'Darrieus-type vertical axis design' },
        { name: 'Blade Material', value: 'Carbon Fiber Reinforced Polymer', description: 'Lightweight and durable blade material' },
        { name: 'Generator Type', value: 'Permanent Magnet Synchronous', description: 'High-efficiency generator type' },
        { name: 'Gear Ratio', value: '1:15', description: 'Gearbox ratio for optimal RPM' },
        { name: 'Yaw Control', value: 'Passive', description: 'Wind direction following mechanism' },
        { name: 'Brake System', value: 'Electromagnetic + Mechanical', description: 'Dual braking system for safety', isAdvanced: true },
        { name: 'Maximum RPM', value: 300, description: 'Maximum rotational speed', isAdvanced: true },
        { name: 'Start-up Torque', value: 2.5, unit: 'Nm', description: 'Minimum torque required to start', isAdvanced: true }
      ],
      controls: [
        {
          id: 'brake_control',
          name: 'Brake Control',
          type: 'button',
          value: false,
          enabled: true,
          description: 'Activate emergency brake system'
        },
        {
          id: 'yaw_lock',
          name: 'Yaw Lock',
          type: 'toggle',
          value: false,
          enabled: true,
          description: 'Lock turbine orientation'
        }
      ],
      relatedEquipment: ['2.1.3']
    },
    '2.1.3': {
      id: '2.1.3',
      name: 'Wind Turbine with Inverter & Storage',
      type: 'Integrated Wind System',
      location: 'First Floor - East Wing',
      status: 'online',
      description: 'Complete wind energy system with power conversion and storage capabilities. Integrates wind turbine, inverter, and battery storage for continuous power supply.',
      photoPath: '/src/assets/2.1.3. Wind-Big-Vertical-inverter-storage.jpg',
      installationDate: '2024-02-10',
      manufacturer: 'WindPower Technologies',
      model: 'WP-INT-3000W',
      serialNumber: 'WP-INT-2024-001',
      data: {
        timestamp: new Date().toISOString(),
        windPower: 1800.0,
        batteryVoltage: 48.0,
        batteryCurrent: 25.0,
        batterySOC: 85.2,
        inverterPower: 1500.0,
        gridPower: 1200.0
      },
      specifications: [
        { name: 'Total System Power', value: 3000, unit: 'W', category: 'Power' },
        { name: 'Battery Capacity', value: 10, unit: 'kWh', category: 'Storage' },
        { name: 'Battery Voltage', value: 48, unit: 'V', category: 'Electrical' },
        { name: 'Inverter Power', value: 3000, unit: 'W', category: 'Power' },
        { name: 'Grid Connection', value: 'Single Phase', category: 'Electrical' },
        { name: 'System Efficiency', value: 92.5, unit: '%', category: 'Performance' }
      ],
      technicalSpecs: [
        { name: 'Inverter Type', value: 'Grid-Tie Inverter', description: 'Synchronized with utility grid' },
        { name: 'Battery Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)', description: 'Safe and long-lasting battery technology' },
        { name: 'Battery Management System', value: 'Integrated BMS', description: 'Advanced battery monitoring and protection' },
        { name: 'Grid Standards', value: 'IEEE 1547, UL 1741', description: 'Compliance with grid interconnection standards' },
        { name: 'Communication', value: 'WiFi + Ethernet', description: 'Dual communication interfaces' },
        { name: 'Maximum DC Input', value: 600, unit: 'V', description: 'Maximum DC input voltage', isAdvanced: true },
        { name: 'AC Output Frequency', value: '50/60', unit: 'Hz', description: 'Configurable output frequency', isAdvanced: true },
        { name: 'Power Factor', value: 0.99, description: 'Near unity power factor', isAdvanced: true }
      ],
      controls: [
        {
          id: 'grid_connection',
          name: 'Grid Connection',
          type: 'toggle',
          value: true,
          enabled: true,
          description: 'Connect or disconnect from utility grid'
        },
        {
          id: 'battery_charge_rate',
          name: 'Battery Charge Rate',
          type: 'slider',
          value: 50,
          min: 0,
          max: 100,
          step: 5,
          enabled: true,
          description: 'Adjust battery charging rate percentage'
        },
        {
          id: 'system_reset',
          name: 'System Reset',
          type: 'button',
          value: false,
          enabled: true,
          description: 'Reset the entire system (use with caution)'
        }
      ],
      relatedEquipment: ['2.1.1']
    }
  };

  return equipmentMap[id] || null;
}

/**
 * Generate mock historical data for charts
 */
function generateMockHistoricalData(id: string, hours: number): import('../types').HistoricalData[] {
  const data: import('../types').HistoricalData[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    
    // Generate realistic data based on equipment type
    let voltage = 48 + Math.random() * 4 - 2;
    let current = 20 + Math.random() * 10 - 5;
    let power = voltage * current;
    let temperature = 25 + Math.random() * 20 - 10;
    let efficiency = 85 + Math.random() * 15;
    
    // Add some variation based on time of day (solar panels)
    if (id.startsWith('1.1')) {
      const hour = timestamp.getHours();
      if (hour >= 6 && hour <= 18) {
        // Daytime - higher values
        voltage = 48 + Math.random() * 6;
        current = 25 + Math.random() * 15;
        power = voltage * current;
        efficiency = 90 + Math.random() * 10;
      } else {
        // Nighttime - lower values
        voltage = 45 + Math.random() * 3;
        current = 5 + Math.random() * 5;
        power = voltage * current;
        efficiency = 0;
      }
    }
    
    // Add wind variation for wind turbines
    if (id.startsWith('2.1')) {
      const windSpeed = 2 + Math.random() * 15;
      if (windSpeed > 2.5 && windSpeed < 25) {
        voltage = 48 + Math.random() * 4;
        current = 30 + Math.random() * 20;
        power = voltage * current;
        efficiency = 85 + Math.random() * 15;
      } else {
        voltage = 48 + Math.random() * 2;
        current = 5 + Math.random() * 5;
        power = voltage * current;
        efficiency = 0;
      }
    }
    
    data.push({
      timestamp: timestamp.toISOString(),
      voltage: Math.round(voltage * 10) / 10,
      current: Math.round(current * 10) / 10,
      power: Math.round(power),
      temperature: Math.round(temperature * 10) / 10,
      efficiency: Math.round(efficiency * 10) / 10,
      status: 'online'
    });
  }
  
  return data;
} 