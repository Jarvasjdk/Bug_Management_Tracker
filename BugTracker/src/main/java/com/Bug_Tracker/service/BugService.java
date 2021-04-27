package com.Bug_Tracker.service;

import com.Bug_Tracker.Model.Bug;
import java.io.IOException;
import java.util.List;

public interface BugService {

    List<Bug> getBugs();

    Bug findBugByBugId(String id);

    void addNewBug(String description,String bugType,String bugLocation,String priority, boolean isActive) ;

    void updateBug(String bugId,String bugDescription,String bugLocation, String bugPriority, String bugType, boolean newIsActive);

    void deleteBug(String id);

}
