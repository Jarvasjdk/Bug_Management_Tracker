package com.Bug_Tracker.service;

import com.Bug_Tracker.Model.Bug;
import org.springframework.security.access.AccessDeniedException;

import java.io.IOException;
import java.util.List;

public interface BugService {

    List<Bug> getBugs();

    Bug findBugByBugId(String id);

    Bug addNewBug(String description,String bugType,String bugLocation,String priority, boolean isActive) ;

    Bug updateBug(String bugId,String bugDescription,String bugLocation, String bugPriority, String bugType, boolean newIsActive);

    String deleteBug(String id) throws AccessDeniedException;

}
