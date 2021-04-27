package com.Bug_Tracker.Controller;
import com.Bug_Tracker.Model.Bug;
import com.Bug_Tracker.service.BugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping(path = {"/" ,"/bug"})
@CrossOrigin("http://localost:4200")
public class BugController
{
        private BugService bugService;

        
        @Autowired
        public BugController(BugService bugService) {
            this.bugService = bugService;

        }

        @PostMapping("/addBug")
        @PreAuthorize("hasAnyAuthority('user:create')")
        public void addNewBug(@RequestParam("bugDescription") String description,
                                             @RequestParam("bugType") String bugType,
                                             @RequestParam("bugLocation") String bugLocation,
                                             @RequestParam("bugPriority") String priority,
                                             @RequestParam("isActive") String isActive
                                                )
                 {


            bugService.addNewBug (description, bugType, bugLocation, priority, Boolean.parseBoolean(isActive));


        }

        @PostMapping("/updateBug")
        @PreAuthorize("hasAnyAuthority('user:update')")
        public void updateBug(@RequestParam("bugId") String bugId,
                                             @RequestParam("bugDescription") String bugDescription,
                                             @RequestParam("bugLocation") String bugLocation,
                                             @RequestParam("bugPriority") String bugPriority,
                                             @RequestParam("bugType") String bugType,

                                             @RequestParam("isActive") String isActive)
        {
            bugService.updateBug(bugId,bugDescription,bugLocation,bugPriority, bugType, Boolean.parseBoolean(isActive));

        }




    @GetMapping("/list")
    public List<Bug> getAllBugs() {
        return bugService.getBugs();

    }

    @DeleteMapping("/delete/{bugId}")
    // @PreAuthorize("hasAnyAuthority('user:delete')")
    public void deleteBug(@PathVariable("bugId") String id)  {
            bugService.deleteBug(id);

    }





}


