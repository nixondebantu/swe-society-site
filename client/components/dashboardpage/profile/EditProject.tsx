"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React from "react";

interface EditProjectProps {
  projects: string[] | null;
  onChange: (projects: string[] | null) => void;
}

const EditProject: React.FC<EditProjectProps> = ({ projects, onChange }) => {
  const handleProjectChange = (index: number, value: string) => {
    if (projects) {
      const updatedProjects = [...projects];
      updatedProjects[index] = value;
      onChange(updatedProjects);
    }
  };

  const handleAddProject = () => {
    if (projects) {
      onChange([...projects, ""]);
    } else {
      onChange([""]);
    }
  };

  const handleRemoveProject = (index: number) => {
    if (projects) {
      const updatedProjects = projects.filter((_, i) => i !== index);
      onChange(updatedProjects);
    }
  };

  return (
    <div className="mb-2">
      <p className="text-xs font-semibold">Projects</p>
      {projects &&
        projects.map((project, index) => (
          <div key={index} className="flex mb-2 items-center gap-2">
            <Input
              type="text"
              value={project}
              onChange={(e) => handleProjectChange(index, e.target.value)}
              placeholder={`Project ${index + 1} URL`}
            />
            <Button
              type="button"
              onClick={() => handleRemoveProject(index)}
              variant={"outline_red"}
              size={"icon"}
              className="text-primary"
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      <Button type="button" variant={"outline_red"} onClick={handleAddProject}>
        Add Project
      </Button>
    </div>
  );
};

export default EditProject;
