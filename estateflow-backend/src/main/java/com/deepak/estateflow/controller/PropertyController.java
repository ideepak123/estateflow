package com.deepak.estateflow.controller;

import com.deepak.estateflow.entity.Property;
import com.deepak.estateflow.service.PropertyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    // Get all properties with pagination and sorting
    @GetMapping
    public Page<Property> getAllProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return propertyService.getAllProperties(pageable);
    }

    // Create a new property
    @PostMapping
    public Property createProperty(
            @RequestBody Property property
    ) {
        return propertyService.saveProperty(property);
    }

    // Search properties by location
    @GetMapping("/search")
    public List<Property> searchByLocation(
            @RequestParam String location
    ) {

        return propertyService.searchByLocation(location);
    }

    // Filter properties by price range
    @GetMapping("/filter")
    public List<Property> filterByPrice(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice
    ) {

        return propertyService.filterByPrice(
                minPrice,
                maxPrice
        );
    }
}