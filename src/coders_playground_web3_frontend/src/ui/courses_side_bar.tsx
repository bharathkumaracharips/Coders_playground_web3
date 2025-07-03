"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  Star,
  ChevronDown,
  ChevronRight,
  Award,
  Users,
  TrendingUp,
  Folder,
  File,
  FileVideo,
  FileCode,
  FileQuestion,
  FileTextIcon
} from "lucide-react";
import { Badge } from "./learn-scroll-badge";
import { Button } from "./learn-scroll-button";
import { Progress } from "./learn-scroll-progress";
import { ScrollArea } from "./learn-scroll-scroll-area";

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'article' | 'quiz' | 'practice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
  progress: number;
  isExpanded: boolean;
}

interface CourseData {
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  totalProgress: number;
  sections: CourseSection[];
}

const sidebarVariants = {
  open: {
    width: "320px",
  },
  closed: {
    width: "60px",
  },
};

const contentVariants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, display: "none" },
};

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};

const CodersBattleGroundCourseSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(['1', '2']));

  const courseData: CourseData = {
    title: "Complete Data Structures & Algorithms",
    description: "Master DSA with comprehensive tutorials and practice problems",
    instructor: "Coders Battle Ground Team",
    rating: 4.8,
    students: 125000,
    totalProgress: 65,
    sections: [
      {
        id: "1",
        title: "Introduction to Programming",
        description: "Basic concepts and fundamentals",
        progress: 100,
        isExpanded: true,
        modules: [
          { id: "1-1", title: "What is Programming?", duration: "10 min", completed: true, type: "video", difficulty: "beginner" },
          { id: "1-2", title: "Setting up Environment", duration: "15 min", completed: true, type: "article", difficulty: "beginner" },
          { id: "1-3", title: "Your First Program", duration: "20 min", completed: true, type: "practice", difficulty: "beginner" },
        ]
      },
      {
        id: "2",
        title: "Arrays and Strings",
        description: "Linear data structures fundamentals",
        progress: 75,
        isExpanded: true,
        modules: [
          { id: "2-1", title: "Introduction to Arrays", duration: "25 min", completed: true, type: "video", difficulty: "beginner" },
          { id: "2-2", title: "Array Operations", duration: "30 min", completed: true, type: "article", difficulty: "intermediate" },
          { id: "2-3", title: "String Manipulation", duration: "35 min", completed: true, type: "video", difficulty: "intermediate" },
          { id: "2-4", title: "Practice Problems", duration: "45 min", completed: false, type: "quiz", difficulty: "intermediate" },
        ]
      },
      {
        id: "3",
        title: "Linked Lists",
        description: "Dynamic data structures",
        progress: 40,
        isExpanded: false,
        modules: [
          { id: "3-1", title: "Singly Linked List", duration: "30 min", completed: true, type: "video", difficulty: "intermediate" },
          { id: "3-2", title: "Doubly Linked List", duration: "35 min", completed: false, type: "video", difficulty: "intermediate" },
          { id: "3-3", title: "Circular Linked List", duration: "25 min", completed: false, type: "article", difficulty: "advanced" },
          { id: "3-4", title: "Implementation Practice", duration: "60 min", completed: false, type: "practice", difficulty: "advanced" },
        ]
      },
      {
        id: "4",
        title: "Stacks and Queues",
        description: "LIFO and FIFO data structures",
        progress: 0,
        isExpanded: false,
        modules: [
          { id: "4-1", title: "Stack Implementation", duration: "25 min", completed: false, type: "video", difficulty: "intermediate" },
          { id: "4-2", title: "Queue Implementation", duration: "30 min", completed: false, type: "video", difficulty: "intermediate" },
          { id: "4-3", title: "Applications", duration: "40 min", completed: false, type: "article", difficulty: "advanced" },
        ]
      },
      {
        id: "5",
        title: "Trees and Graphs",
        description: "Non-linear data structures",
        progress: 0,
        isExpanded: false,
        modules: [
          { id: "5-1", title: "Binary Trees", duration: "45 min", completed: false, type: "video", difficulty: "advanced" },
          { id: "5-2", title: "Graph Traversal", duration: "50 min", completed: false, type: "video", difficulty: "advanced" },
          { id: "5-3", title: "Advanced Algorithms", duration: "60 min", completed: false, type: "practice", difficulty: "advanced" },
        ]
      }
    ]
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <FileVideo className="h-4 w-4" />;
      case 'article': return <FileTextIcon className="h-4 w-4" />;
      case 'quiz': return <FileQuestion className="h-4 w-4" />;
      case 'practice': return <FileCode className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      className="h-screen bg-background border-r border-border flex flex-col"
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <motion.div
            variants={contentVariants}
            className="min-w-0"
          >
            <h2 className="font-semibold text-sm text-foreground truncate">Coders Battle Ground</h2>
            <p className="text-xs text-muted-foreground">Learn & Practice</p>
          </motion.div>
        </div>
      </div>

      {/* Course Info */}
      <motion.div
        variants={contentVariants}
        className="p-4 border-b border-border"
      >
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-sm text-foreground line-clamp-2">{courseData.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{courseData.instructor}</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{courseData.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{(courseData.students / 1000).toFixed(0)}k</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{courseData.totalProgress}%</span>
            </div>
            <Progress value={courseData.totalProgress} className="h-2" />
          </div>
        </div>
      </motion.div>

      {/* Course Content */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {courseData.sections.map((section) => (
            <div key={section.id} className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start p-2 h-auto text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <motion.div
                    variants={iconVariants}
                    animate={expandedSections.has(section.id) ? "open" : "closed"}
                    transition={{ duration: 0.2 }}
                  >
                    {expandedSections.has(section.id) ? <ChevronDown className="h-4 w-4 flex-shrink-0" /> : <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                  </motion.div>
                  <Folder className="h-4 w-4 text-blue-500 flex-shrink-0" /> {/* Folder icon for sections */}
                  <div className="min-w-0 text-left">
                    <motion.div variants={contentVariants}>
                      <p className="text-sm font-medium text-foreground truncate">{section.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-12 bg-muted rounded-full h-1">
                          <div 
                            className="bg-green-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${section.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{section.progress}%</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Button>

              <AnimatePresence>
                {expandedSections.has(section.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="ml-6 mt-0 space-y-0.5 overflow-hidden"
                  >
                    {section.modules.map((module) => (
                      <motion.div
                        key={module.id}
                        variants={contentVariants}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors",
                          module.completed && "bg-green-50 dark:bg-green-950/20"
                        )}
                      >
                        <div className={cn(
                          "flex-shrink-0",
                          module.completed ? "text-green-600" : "text-muted-foreground"
                        )}>
                          {module.completed ? <CheckCircle className="h-4 w-4" /> : getModuleIcon(module.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={cn(
                            "text-xs font-medium truncate",
                            module.completed ? "text-green-700 dark:text-green-400" : "text-foreground"
                          )}>
                            {module.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{module.duration}</span>
                            </div>
                            <Badge 
                              className={cn("text-xs px-1 py-0", getDifficultyColor(module.difficulty))}
                            >
                              {module.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <motion.div
        variants={contentVariants}
        className="p-4 border-t border-border"
      >
        <div className="space-y-3">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Award className="h-4 w-4" />
            <span className="text-xs">Get Certificate</span>
          </Button>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Overall Progress</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{courseData.totalProgress}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CourseSidebarDemo() {
  return (
    <div className="flex h-screen bg-background">
      <CodersBattleGroundCourseSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">Course Content</h1>
          <p className="text-muted-foreground mb-8">
            This is the main content area where course videos, articles, and practice problems would be displayed.
            The sidebar on the left shows the course structure in a Coders Battle Ground-inspired design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Current Module</h3>
              <p className="text-sm text-muted-foreground">Array Operations - Understanding basic array manipulations and algorithms</p>
            </div>
            
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Next Up</h3>
              <p className="text-sm text-muted-foreground">String Manipulation - Learn string processing techniques and patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

