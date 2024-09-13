import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, AlertTriangle, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Groq from 'groq-sdk';
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: number;
  description: string;
}

interface PlannerData {
  alert: {
    title: string;
    description: string;
  };
  tasks: Task[];
}

interface WindyData {
  ts: number[];
  units: {
    "wind_u-surface": string;
    "wind_v-surface": string;
    "temp-surface": string;
    "past3hprecip-surface": string;
  };
  "wind_u-surface": number[];
  "wind_v-surface": number[];
  "temp-surface": number[];
  "past3hprecip-surface": number[];
  warning: string;
}

interface PlannerProps {
  windyData?: WindyData;
  onPlanGenerated?: (tasks: Task[]) => void;
}

export default function Planner({ windyData = {} as WindyData, onPlanGenerated }: PlannerProps) {
  const [plannerData, setPlannerData] = useState<PlannerData | null>(null);
  const [displayData, setDisplayData] = useState<PlannerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem('plannerData');
    if (savedData) {
      setPlannerData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (isMounted && plannerData) {
      localStorage.setItem('plannerData', JSON.stringify(plannerData));
    }
  }, [isMounted, plannerData]);

  const fetchPlannerData = async () => {
    setIsLoading(true);
    const groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      dangerouslyAllowBrowser: true
    });
    
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "System Instruction for CrisisCore AI\n\nData Input:\n\n- Timestamps (ts): Provided as Unix epoch timestamps (in milliseconds), corresponding to specific times for weather data points.\n- Variables: The dataset includes weather-related variables with units:\n  - wind_u-surface: Zonal wind component (east or west) in meters per second (m/s).\n  - wind_v-surface: Meridional wind component (north or south) in meters per second (m/s).\n  - temp-surface: Surface temperature in Kelvin (K).\n  - past3hprecip-surface: Precipitation accumulated over the past three hours in meters (m).\n\nNext Steps:\n\n1. Convert Timestamps: Convert the ts values to human-readable dates and times.\n2. Visualize Data: Plot the time series data for each variable (temperature, wind speed, etc.) to identify trends.\n3. Data Cleaning: Verify the dataset for missing or erroneous values.\n4. Analysis:\n   - Compute wind speed and direction using wind_u and wind_v.\n   - Examine temperature and precipitation data for patterns or anomalies.\n\nCrisis Assessment and Disaster Identification:\n\n1. Input Handling:\n   - Gather forecast information for the next 3-4 hours, focusing on temperature, precipitation, wind speed, humidity, and meteorological warnings.\n\n2. Disaster Identification:\n   Analyze the data to determine if the situation indicates a disaster, probable disaster, or normal conditions. Identify disaster types and symptoms:\n   - Floods: Rising water levels, continuous rainfall, waterlogging, and warnings.\n   - Cyclones: Heavy rain, strong winds, rapid pressure drops, tidal surges, and alerts.\n   - Tornadoes: Thunderstorms, wind rotation, dark funnel-shaped clouds, and gusts.\n   - Landslides: Soil shifting, cracks, tilted trees, and water runoff.\n   - Heatwaves: Temperatures above 37°C, dry conditions, and heat-related warnings.\n   - Cold Waves: Temperatures below 13°C, frosty conditions, and fog.\n   - Riverbank Erosion: Changes in river current, land subsidence, or flooding near inhabited areas.\n   - Lightning Strikes: Dark clouds, lightning flashes, and thunder.\n   - Droughts: Low rainfall, water shortages, dry crops, and cracked soil.\n\n3. Disaster Preparation Planner:\n   Generate an Instant Planner based on the situation analysis.\n\n4. Action-Based Planner for the Next 3-4 Hours:\n   - Risk Identification: Use analyzed data to identify and prioritize immediate threats like floods or cyclones.\n   - Action Timeline: Provide a time-based sequence of actions:\n     - 0-30 minutes: Move valuables to higher ground and unplug electronics.\n     - 30-60 minutes: Prepare emergency kits and monitor news.\n     - 60-120 minutes: Evacuate if necessary and seek higher ground.\n     - After 120 minutes: Stay indoors or in a safe shelter until further updates.\n\nAt least 15 Plan must be present. Note that you will tell him what to do and how to do, not like Prepare for this and that, give him direct ideas on what to do. Each point should be 2/3 line elaborated so he can understand what he has to do\n  GIVE OUTPUT as JSON \n\n{\n  \"alert\": {\n    \"title\": \"Alert\",\n    \"description\": \"\"\n  },\n  \"tasks\": [\n    {\n      \"id\": ,\n      \"description\": \" \"\n    }\n\n\n\nExample output for \n\n{\n  \"alert\": {\n    \"title\": \"Alert\",\n    \"description\": \"23CM Rainfall in last 30 mins, 2 hours very heavy rainshower incoming\"\n  },\n  \"tasks\": [\n    {\n      \"id\": 1,\n      \"description\": \"Gather important papers and put them in a waterproof bag or container. Use a zip-lock bag if you have one.\"\n    },\n    {\n      \"id\": 2,\n      \"description\": \"Move to higher ground if you're in a low-lying area. Go to the highest floor of your building if you can't leave.\"\n    },\n    {\n      \"id\": 3,\n      \"description\": \"Prepare an emergency kit with food, water, medicines, and a flashlight. Put it in a waterproof bag.\"\n    },\n    {\n      \"id\": 4,\n      \"description\": \"Turn off electricity, gas, and water supplies if it's safe to do so.\"\n    },\n    {\n      \"id\": 5,\n      \"description\": \"Stay away from flood water. It may be dirty or have electric currents.\"\n    },\n    {\n      \"id\": 6,\n      \"description\": \"Keep your phone charged and listen to local news for updates.\"\n    },\n    {\n      \"id\": 7,\n      \"description\": \"Help your neighbors, especially elderly or disabled people, if you can do so safely.\"\n    },\n    {\n      \"id\": 8,\n      \"description\": \"Don't drive through flooded areas. Your car can be swept away in just 23cm of water.\"\n    },\n    {\n      \"id\": 9,\n      \"description\": \"Be ready to leave quickly if told to evacuate. Know where the nearest safe place is.\"\n    },\n    {\n      \"id\": 10,\n      \"description\": \"If you're trapped, go to the roof and signal for help. Use a bright cloth or flashlight.\"\n    },\n    {\n      \"id\": 11,\n      \"description\": \"Secure loose items outside your home that could be swept away by flood waters.\"\n    },\n    {\n      \"id\": 12,\n      \"description\": \"Fill clean containers with drinking water in case the water supply becomes contaminated.\"\n    },\n    {\n      \"id\": 13,\n      \"description\": \"Move valuable items and electronics to higher levels in your home.\"\n    },\n    {\n      \"id\": 14,\n      \"description\": \"Wear protective clothing and footwear if you must walk through flood water.\"\n    },\n    {\n      \"id\": 15,\n      \"description\": \"Be cautious of snakes and other animals that may have been displaced by flood waters.\"\n    },\n    {\n      \"id\": 16,\n      \"description\": \"If you smell gas or suspect a leak, leave immediately and inform authorities.\"\n    },\n    {\n      \"id\": 17,\n      \"description\": \"Use your mobile phone sparingly to conserve battery life.\"\n    },\n    {\n      \"id\": 18,\n      \"description\": \"If you have time, consider helping neighbors move their valuables to higher ground.\"\n    },\n    {\n      \"id\": 19,\n      \"description\": \"Keep children and pets indoors and away from flood waters.\"\n    },\n    {\n      \"id\": 20,\n      \"description\": \"If you have a water pump, make sure it's working and ready to use.\"\n    },\n    {\n      \"id\": 21,\n      \"description\": \"Be prepared for power outages. Have flashlights and batteries ready.\"\n    },\n    {\n      \"id\": 22,\n      \"description\": \"If you have a generator, ensure it's in working condition and has fuel.\"\n    },\n    {\n      \"id\": 23,\n      \"description\": \"Monitor the structural integrity of your home. If you notice any cracks or shifting, evacuate immediately.\"\n    },\n    {\n      \"id\": 24,\n      \"description\": \"Have a designated family meeting point in case you get separated.\"\n    },\n    {\n      \"id\": 25,\n      \"description\": \"Stay calm and reassure family members, especially children and elderly.\"\n    }\n  ]\n}\n"
          },
          {
            role: "user",
            content: JSON.stringify({
              windyData: windyData
            })
          }
        ],
        model: "llama3-groq-70b-8192-tool-use-preview",
        temperature: 0.2,
        max_tokens: 1024,
        top_p: 0.65,
        stream: false,
        response_format: {
          type: "json_object"
        },
        stop: null
      });

      console.log("API Response:", chatCompletion); // Debug log

      const content = chatCompletion.choices[0].message.content;
      if (content) {
        try {
          const parsedData = JSON.parse(content) as PlannerData;
          console.log("Parsed Data:", parsedData); // Debug log
          if (parsedData.alert && parsedData.tasks && Array.isArray(parsedData.tasks)) {
            setPlannerData(parsedData);
            setDisplayData(null);
            setIsTyping(true);
            if (onPlanGenerated) {
              onPlanGenerated(parsedData.tasks);
            }
          } else {
            throw new Error("Invalid data structure");
          }
        } catch (parseError) {
          console.error("Error parsing API response:", parseError);
          // Handle parsing error (e.g., set an error state or show a message to the user)
        }
      } else {
        console.error("No content in the response");
        // Handle empty response (e.g., set an error state or show a message to the user)
      }
    } catch (error) {
      console.error("Error fetching planner data:", error);
      // Handle API error (e.g., set an error state or show a message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isTyping || !plannerData) return;

    let fullText = plannerData.alert.description + plannerData.tasks.map(t => t.description).join('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayData(prevData => {
          if (!prevData) return { alert: { title: plannerData.alert.title, description: '' }, tasks: [] };
          let newData = { ...prevData };
          if (i < plannerData.alert.description.length) {
            newData.alert.description = plannerData.alert.description.slice(0, i + 1);
          } else {
            let taskIndex = Math.floor((i - plannerData.alert.description.length) / 50);
            let charIndex = (i - plannerData.alert.description.length) % 50;
            if (taskIndex < plannerData.tasks.length) {
              newData.tasks = plannerData.tasks.slice(0, taskIndex);
              newData.tasks.push({
                id: plannerData.tasks[taskIndex].id,
                description: plannerData.tasks[taskIndex].description.slice(0, charIndex + 1)
              });
            }
          }
          return newData;
        });
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setDisplayData(plannerData);
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [isTyping, plannerData]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <BrainCircuit className="w-6 h-6 mr-2" />
          AI Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Button 
          onClick={fetchPlannerData} 
          disabled={isLoading || isTyping}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? "Loading..." : isTyping ? "Generating..." : "Get Planner"}
        </Button>
        <div className="bg-[#111111] rounded-lg p-4 flex-grow overflow-y-auto">
          {displayData ? (
            <div className="space-y-4">
              <WeatherAlert alert={displayData.alert} />
              <Checklist tasks={displayData.tasks} />
            </div>
          ) : (
            <p className="text-white text-sm">
              {isLoading ? "Generating planner data..." : "Click 'Get Planner' to generate a plan based on current weather data."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherAlert({ alert }: { alert: PlannerData['alert'] }) {
  return (
    <div className="mb-4">
      <h2 className="text-white text-lg font-bold flex items-center mb-2">
        <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
        Weather Alert
      </h2>
      <div className="bg-[#800020] bg-opacity-20 rounded-lg p-3">
        <h3 className="text-[#F4C2C2] font-semibold mb-1">{alert.title}</h3>
        <p className="text-white text-sm">{alert.description}</p>
      </div>
    </div>
  );
}

function Checklist({ tasks }: { tasks: PlannerData['tasks'] }) {
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const toggleTask = (taskId: number) => {
    setCheckedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div>
      <h2 className="text-white text-lg font-bold flex items-center mb-2">
        <CheckSquare className="w-5 h-5 mr-2 text-green-500" />
        Action Checklist
      </h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-start">
            <Checkbox
              id={`task-${task.id}`}
              checked={checkedTasks.includes(task.id)}
              onCheckedChange={() => toggleTask(task.id)}
              className="mr-2 mt-1"
            />
            <label
              htmlFor={`task-${task.id}`}
              className="text-white text-sm cursor-pointer"
            >
              {task.description}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
