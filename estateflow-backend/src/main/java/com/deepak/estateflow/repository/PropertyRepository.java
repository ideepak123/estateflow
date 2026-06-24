package com.deepak.estateflow.repository;

import com.deepak.estateflow.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository
        extends JpaRepository<Property, Long> {

    List<Property> findByLocationContainingIgnoreCase(
            String location
    );

    List<Property> findByPriceBetween(
            Double minPrice,
            Double maxPrice
    );

    long countByStatus(String status);
}