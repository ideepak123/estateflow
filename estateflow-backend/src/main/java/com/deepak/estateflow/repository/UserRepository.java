package com.deepak.estateflow.repository;

import java.util.Optional;
import com.deepak.estateflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
