package com.myapp.ResearchConference.Rest.rest;

import com.myapp.ResearchConference.Rest.Restservice.RoleRestService;
import com.myapp.ResearchConference.Rest.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api")
public class RoleRest {

    private final RoleRestService roleRestService;

    @Autowired
    public RoleRest(RoleRestService roleRestService) {
        this.roleRestService = roleRestService;
    }

    @GetMapping("roles")
    public List<Role> findAll(){
        return roleRestService.findAll();
    }
}
