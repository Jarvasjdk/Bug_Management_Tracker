package com.Bug_Tracker.Controller;

import com.Bug_Tracker.Model.Project;
import com.Bug_Tracker.dto.BugDTO;
import com.Bug_Tracker.dto.ProjectDTO;
import com.Bug_Tracker.repository.UserRepository;
import com.Bug_Tracker.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = {"/project"})
@CrossOrigin("http://localost:4200")
public class ProjectController {
    private ProjectService projectService;
    private UserRepository userRepository;

    @Autowired
    ProjectController(ProjectService projectService, UserRepository userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;

    }


    @PostMapping("/createProject")
    @PreAuthorize("hasAnyAuthority('project:create')")
    public Project createProject(@RequestParam("projectName") String projectName,
                                 @RequestParam("projectDescription") String projectDescription) {
        return projectService.addProject(projectName, projectDescription);

    }

    @PostMapping("/assignProjectToUser")
    @PreAuthorize("hasAnyAuthority('project:assign')")
    public Project assignProjectToUser(@RequestParam("projectName") String projectName,
                                       @RequestParam("username") String username) {
        return projectService.assignProjectToUser(projectName, username);
    }
    @PostMapping("/listUserAssignedProjects")
    public List<ProjectDTO> listUserAssignedProjects(@RequestParam("username") String username){
        return projectService.listUserAssignedProjects(username);
    }

    @PostMapping("/assignProjectIdToBug")
    @PreAuthorize("hasAnyAuthority('project:assign')")
    public Project assignBugsToProject(@RequestParam("projectName") String projectName,
                                       @RequestParam("bugId") String bugId) {
        return projectService.assignBugToProject(projectName, bugId);
    }
    @PostMapping("/listProjectBugs")
    public List<BugDTO> listProjectBugs(@RequestParam("projectName") String projectName){
        return projectService.listProjectBugs(projectName);
    }



}