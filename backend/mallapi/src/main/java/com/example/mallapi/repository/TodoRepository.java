package com.example.mallapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mallapi.domain.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    
}
