package com.Bug_Tracker.service.impl;

import com.Bug_Tracker.Model.Bug;
import com.Bug_Tracker.repository.BugRepository;
import com.Bug_Tracker.service.BugService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
@Transactional
@Service
public class BugServiceImpl implements BugService {

    private String generateBugId() {
        return RandomStringUtils.randomNumeric(10);
    }

    private BugRepository bugRepository;

    @Autowired
    public BugServiceImpl(BugRepository bugRepository) {
        this.bugRepository = bugRepository;
    }

    @Override
    public List<Bug> getBugs() {
        return bugRepository.findAll();
    }



    @Override
    public Bug findBugByBugId(String id) {
         return bugRepository.findBugByBugId(id);
    }


    @Override
    public Bug addNewBug(String description,String bugType,String bugLocation,String priority, boolean isActive)
    { Bug bug = new Bug();
        bug.setBugId(generateBugId());
        bug.setBugDescription(description);
        bug.setBugPriority(priority);
        bug.setBugDate(new Date());
        bug.setBugType(bugType);
        bug.setActive(isActive);
        bug.setBugLocation(bugLocation);
        bugRepository.save(bug);
        return bug;
    }



    @Override
    public Bug updateBug(String bugId,String bugDescription,String bugLocation, String bugPriority, String bugType, boolean Active)
    { Bug bug = findBugByBugId(bugId);// currentBug
        bug.setBugDescription(bugDescription);
        bug.setBugLocation(bugLocation);
        bug.setBugPriority(bugPriority);
        bug.setBugType(bugType);
        bug.setActive(Active);
        bugRepository.save(bug);
        return bug;

    }


    @Override
    public String deleteBug(String id) {
        Bug bug = bugRepository.findBugByBugId(id);
        bugRepository.deleteById(bug.getId());
        return id;

    }

}
