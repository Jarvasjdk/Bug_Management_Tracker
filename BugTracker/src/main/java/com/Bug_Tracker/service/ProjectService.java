package com.Bug_Tracker.service;

import com.Bug_Tracker.Model.Project;
import com.Bug_Tracker.dto.BugDTO;
import com.Bug_Tracker.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {
    Project addProject(String projectName, String projectDescription);
    Project assignProjectToUser(String projectName, String username);
    Project findProjectByProjectName(String projectName);
    List<ProjectDTO> listUserAssignedProjects(String username);
    Project assignBugToProject(String projectName, String bugId);
    List<BugDTO> listProjectBugs(String bugId);
}
