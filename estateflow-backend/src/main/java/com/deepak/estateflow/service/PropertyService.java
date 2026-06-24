package com.deepak.estateflow.service;

import com.deepak.estateflow.entity.Property;
import com.deepak.estateflow.repository.PropertyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // Pagination + Sorting
    public Page<Property> getAllProperties(Pageable pageable) {
        return propertyRepository.findAll(pageable);
    }

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Save property
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    // Search by location
    public List<Property> searchByLocation(String location) {
        return propertyRepository
                .findByLocationContainingIgnoreCase(location);
    }

    // Filter by price range
    public List<Property> filterByPrice(
            Double minPrice,
            Double maxPrice) {

        return propertyRepository
                .findByPriceBetween(minPrice, maxPrice);
    }
}