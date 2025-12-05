export const dbDesign = {
  PackageType: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      name: { type: "String", maxLength: 150, unique: true, nullable: false },
      image: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },
    indexes: [
      { fields: ["name"], name: "idx_package_type_name" }
    ]
  },

  PackageActivity: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      name: { type: "String", maxLength: 150, unique: true, nullable: false },
      image: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },
    indexes: [
      { fields: ["name"], name: "idx_package_activity_name" }
    ]
  },

  Package: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageTypeId: { type: "String", nullable: false },
      packageName: { type: "String", maxLength: 200, nullable: false },

      countryId: { type: "String", nullable: true },
      stateId: { type: "String", nullable: true },
      cityId: { type: "String", nullable: true },

      days: { type: "Int", nullable: false },
      nights: { type: "Int", nullable: false },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
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
      { fields: ["packageName"], name: "idx_package_name" },
      { fields: ["packageTypeId"], name: "idx_package_type" }
    ]
  },

  PackageDay: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageId: { type: "String", nullable: false },
      dayNumber: { type: "Int", nullable: false },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },

    relations: {
      package: {
        type: "Package",
        relation: "many-to-one",
        foreignKey: "packageId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["packageId"], name: "idx_package_day_package" }
    ]
  },

  PackageDayTravelType: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageDayId: { type: "String", nullable: false },

      type: { type: "String", maxLength: 150, nullable: false },
      carpooling: { type: "String", maxLength: 100, nullable: true },
      vehicleType: { type: "String", maxLength: 100, nullable: true },

      timeFrom: { type: "String", nullable: true },
      timeTo: { type: "String", nullable: true },

      description: { type: "Text", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },

    relations: {
      packageDay: {
        type: "PackageDay",
        relation: "many-to-one",
        foreignKey: "packageDayId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["packageDayId"], name: "idx_pkg_day_travel" }
    ]
  },

  PackageDaySightseeing: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageDayId: { type: "String", nullable: false },

      sightseeingName: { type: "String", maxLength: 200, nullable: false },
      ticket: { type: "String", nullable: true },

      timeFrom: { type: "String", nullable: true },
      timeTo: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },

    relations: {
      packageDay: {
        type: "PackageDay",
        relation: "many-to-one",
        foreignKey: "packageDayId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["packageDayId"], name: "idx_pkg_day_sight" }
    ]
  },

  PackageDayHotel: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      packageDayId: { type: "String", nullable: false },

      hotelName: { type: "String", maxLength: 200, nullable: false },
      starRating: { type: "Int", nullable: false },
      hotelType: { type: "String", maxLength: 100, nullable: true },

      checkInTime: { type: "String", nullable: true },
      checkOutTime: { type: "String", nullable: true },

      roomType: { type: "String", maxLength: 150, nullable: true },
      numberOfRooms: { type: "Int", nullable: true },

      actualCheckIn: { type: "String", nullable: true },
      actualCheckOut: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false },
    },

    relations: {
      packageDay: {
        type: "PackageDay",
        relation: "many-to-one",
        foreignKey: "packageDayId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["packageDayId"], name: "idx_pkg_day_hotel" }
    ]
  }
};
