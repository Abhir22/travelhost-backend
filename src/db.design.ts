export const dbDesign = {

  PackageType: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      name: { type: "String", maxLength: 150, unique: true, nullable: false },
      image: { type: "String", nullable: true },
      isInternational: { type: "Boolean", default: false },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },
    indexes: [
      { fields: ["name"], name: "idx_package_type_name" }
    ]
  },

  PackageCategory: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      name: { type: "String", maxLength: 150, unique: true, nullable: false },
      icon: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },
    indexes: [
      { fields: ["name"], name: "idx_package_category_name" }
    ]
  },

  PackageCategoryMapping: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageId: { type: "String", nullable: false },
      categoryId: { type: "String", nullable: false },
    },
    relations: {
      package: { type: "Package", relation: "many-to-one", foreignKey: "packageId", onDelete: "CASCADE" },
      category: { type: "PackageCategory", relation: "many-to-one", foreignKey: "categoryId", onDelete: "CASCADE" }
    },
    indexes: [
      { fields: ["packageId"], name: "idx_pkg_cat_package" }
    ]
  },

  PackageActivity: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      name: { type: "String", maxLength: 150, unique: true, nullable: false },
      image: { type: "String", nullable: true },
      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    indexes: [
      { fields: ["name"], name: "idx_package_activity_name" }
    ]
  },

  PackageActivityMapping: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      packageId: { type: "String", nullable: false },
      activityId: { type: "String", nullable: false }
    },
    relations: {
      package: { type: "Package", relation: "many-to-one", foreignKey: "packageId", onDelete: "CASCADE" },
      activity: { type: "PackageActivity", relation: "many-to-one", foreignKey: "activityId", onDelete: "CASCADE" }
    },
    indexes: [
      { fields: ["packageId"], name: "idx_pkg_activity_package" }
    ]
  },

  PackageSnapshot: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      name: { type: "String", maxLength: 100, unique: true, nullable: false },
      icon: { type: "String", nullable: true },
      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    }
  },

  PackageSnapshotMapping: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      packageId: { type: "String", nullable: false },
      snapshotId: { type: "String", nullable: false }
    },
    relations: {
      package: { type: "Package", relation: "many-to-one", foreignKey: "packageId", onDelete: "CASCADE" },
      snapshot: { type: "PackageSnapshot", relation: "many-to-one", foreignKey: "snapshotId", onDelete: "CASCADE" }
    }
  },

  Package: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageTypeId: { type: "String", nullable: false },

      packageName: { type: "String", maxLength: 200, nullable: false },

      description: { type: "Text", nullable: true },
      video: { type: "String", nullable: true },

      basePrice: { 
        type: "Decimal", 
        precision: 10, 
        scale: 2, 
        nullable: true,
        check: "basePrice >= 0"
      },

      days: { type: "Int", nullable: false },
      nights: { type: "Int", nullable: false },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },

    relations: {
      packageType: {
        type: "PackageType",
        relation: "many-to-one",
        foreignKey: "packageTypeId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["packageName"], name: "idx_package_name" }
    ]
  },

  PackageCity: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageId: { type: "String", nullable: false },

      countryId: { type: "String", nullable: false },
      stateId: { type: "String", nullable: true },
      cityId: { type: "String", nullable: false },

      totalDays: { type: "Int", nullable: false },
      totalNights: { type: "Int", nullable: false },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    relations: {
      package: {
        type: "Package",
        relation: "many-to-one",
        foreignKey: "packageId",
        onDelete: "CASCADE"
      }
    }
  },

  PackageCityDay: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageCityId: { type: "String", nullable: false },
      dayNumber: { type: "Int", nullable: false },

      startTime: { type: "String", nullable: true },
      endTime: { type: "String", nullable: true },
      startFrom: { type: "String", nullable: true },
      endAt: { type: "String", nullable: true },

      description: { type: "Text", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    relations: {
      packageCity: {
        type: "PackageCity",
        relation: "many-to-one",
        foreignKey: "packageCityId",
        onDelete: "CASCADE"
      }
    }
  },

  PackageCityDayTravel: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageCityDayId: { type: "String", nullable: false },

      type: { type: "String", nullable: false },
      carpooling: { type: "String", nullable: true },
      vehicleType: { type: "String", nullable: true },
      timeFrom: { type: "String", nullable: true },
      timeTo: { type: "String", nullable: true },
      description: { type: "Text", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    relations: {
      packageCityDay: {
        type: "PackageCityDay",
        relation: "many-to-one",
        foreignKey: "packageCityDayId",
        onDelete: "CASCADE"
      }
    }
  },

  PackageCityDaySightseeing: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageCityDayId: { type: "String", nullable: false },

      sightseeingName: { type: "String", nullable: false },
      ticket: { type: "String", nullable: true },
      timeFrom: { type: "String", nullable: true },
      timeTo: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    relations: {
      packageCityDay: {
        type: "PackageCityDay",
        relation: "many-to-one",
        foreignKey: "packageCityDayId",
        onDelete: "CASCADE"
      }
    }
  },

  PackageCityDayHotel: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageCityDayId: { type: "String", nullable: false },

      hotelName: { type: "String", nullable: false },
      starRating: { type: "Int", nullable: false },
      hotelType: { type: "String", nullable: true },
      checkInTime: { type: "String", nullable: true },
      checkOutTime: { type: "String", nullable: true },
      roomType: { type: "String", nullable: true },
      numberOfRooms: { type: "Int", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    relations: {
      packageCityDay: {
        type: "PackageCityDay",
        relation: "many-to-one",
        foreignKey: "packageCityDayId",
        onDelete: "CASCADE"
      }
    }
  },

  PackageCityDayMeal: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageCityDayId: { type: "String", nullable: false },

      mealType: { type: "String", nullable: false },
      provider: { type: "String", nullable: false },
      time: { type: "String", nullable: true },
      description: { type: "Text", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },
    relations: {
      packageCityDay: {
        type: "PackageCityDay",
        relation: "many-to-one",
        foreignKey: "packageCityDayId",
        onDelete: "CASCADE"
      }
    }
  }

};
