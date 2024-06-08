package com.elias.springboot.restcrud.rest;


import com.elias.springboot.restcrud.dao.RoleDAO;
import com.elias.springboot.restcrud.dao.UserDAO;
import com.elias.springboot.restcrud.dto.LoginRequest;
import com.elias.springboot.restcrud.dto.LoginReturnDTO;
import com.elias.springboot.restcrud.dto.UserDto;
import com.elias.springboot.restcrud.entity.Role;
import com.elias.springboot.restcrud.entity.Users;
import com.elias.springboot.restcrud.security.JwtService;
import com.elias.springboot.restcrud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private RoleDAO roleDAO;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService,
                                    PasswordEncoder passwordEncoder, RoleDAO roleDAO) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleDAO = roleDAO;
    }

@PostMapping("/set-password")
public ResponseEntity<?>  registration(@RequestBody  UserDto userDto){
            if (userService.getOneUser(userDto.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Users already exists!");
        }
    String fullName = userDto.getFullName();
    int spaceIndex = fullName.indexOf(' ');
    Users user = new Users();
    user.setDepartments(userDto.getDepartments());
    user.setPhotoPath(userDto.getPhotoPath());
    user.setRoles(userDto.getRoles());
    user.setMailFooter(userDto.getMailFooter());
    user.setGender(userDto.getGender());
    user.setFullName(userDto.getFullName());
    if (spaceIndex != -1) {
        String newUserName = fullName.substring(0, spaceIndex) + "@digitalequb.com";
        user.setUsername(newUserName);
    } else {
        String newUserName = fullName + "@digitalequb.com";
        user.setUsername(newUserName);
    }
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    userService.saveUser(user);


    return ResponseEntity.ok("Users registered successfully");
}

    @PostMapping("/login")
    public LoginReturnDTO authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUserName(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Fetch user details from your UserDetailsService instead of casting
        Users user = userService.findByUserName(loginRequest.getUserName());

        // Generate token using fetched UserDetails
        String jwt = jwtService.generateToken(user);

        LoginReturnDTO loginReturnDTO = new LoginReturnDTO();
        loginReturnDTO.setUserId(user.getId());
        loginReturnDTO.setToken(jwt);
        loginReturnDTO.setUsername(user.getUsername());
        loginReturnDTO.setPhotoPath(user.getPhotoPath());
        loginReturnDTO.setMailFooter(user.getMailFooter());
        // application.security.jwt.expiration=3600000
        loginReturnDTO.setExpiresOn(new Date(System.currentTimeMillis() + 3600000));
        loginReturnDTO.setUser(user);
        loginReturnDTO.setFullName(user.getFullName());
        loginReturnDTO.setGender(user.getGender());
        loginReturnDTO.setAuthorities(user.getAuthorities());
        return loginReturnDTO;
    }
    @GetMapping("/users")
    public List<Users> findAll(){
        return userService.findAll();
    }
    @GetMapping("/roles")
    public List<Role> findAllRoles(){
        return roleDAO.findAll();
    }
    @PutMapping("/activate/{userId}")
    public String activate(@PathVariable int userId){
       Users user = userService.findById(userId);
       user.setEnabled(!user.getEnabled());
        userService.saveUser(user);
        return "1";

    }
    @PutMapping("/reset/{userId}")
    public String reset(@PathVariable int userId){
        Users user = userService.findById(userId);
        user.setPassword(passwordEncoder.encode("12345678"));
        userService.saveUser(user);
        return "1";

    }
    @PostMapping("/change-password")
    public String changePassword(@RequestBody UserDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Fetch user details from your UserDetailsService instead of casting
        Users user = userService.findByUserName(loginRequest.getUsername());

        // If Login is successful, then change password
        if(loginRequest.getPhotoPath() != null) {
            user.setPhotoPath(loginRequest.getPhotoPath());
        }
        user.setMailFooter(loginRequest.getMailFooter());
        user.setPassword(passwordEncoder.encode(loginRequest.getNewPassword()));
        userService.saveUser(user);

        return "Successfully Updated";
    }
    @GetMapping("/{userId}")
    public Users getOne(@PathVariable int userId){
        return userService.findById(userId);


    }

}

