package com.example.overcome;

import com.example.overcome.model.Role;
import com.example.overcome.model.User;
import com.example.overcome.repository.RoleRepository;
import com.example.overcome.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import java.util.Set;

@Component
public class AppRunner implements ApplicationRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;



    public AppRunner(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }



    @Override
    public void run(ApplicationArguments args) throws Exception {
        Role adminRole = new Role("ROLE_ADMIN");
        Role userRole = new Role("ROLE_USER");
        roleRepository.save(adminRole);
        roleRepository.save(userRole);

        User admin1 = new User();
        admin1.setFirstname("admin");
        admin1.setLastname("admin");
        admin1.setAge(21);
        admin1.setEmail("admin@gmail.com");
        admin1.setPassword(passwordEncoder.encode("admin"));
        admin1.setRoles(Set.of(adminRole, userRole));

        userRepository.save(admin1);
        userRepository.flush();

    }
}
