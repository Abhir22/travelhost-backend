exports.dbDesign = {
  Hotel: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      countryId: { type: "String", nullable: false },
      stateId: { type: "String", nullable: false },
      cityId: { type: "String", nullable: false },
      sightseeingId: { type: "String", nullable: true },
      name: { type: "String", maxLength: 200, nullable: false },
      createdAt: { type: "DateTime", default: "now()" },
      updatedAt: { type: "DateTime", default: "now()" }
    },
    indexes: [{ fields: ["name"], name: "idx_hotel_name" }]
  },

  TravelType: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      countryId: { type: "String", nullable: false },
      stateId: { type: "String", nullable: false },
      cityId: { type: "String", nullable: false },
      sightseeingId: { type: "String", nullable: true },
      name: { type: "String", maxLength: 200, nullable: false },
      hotelId: { type: "String", nullable: true },
      createdAt: { type: "DateTime", default: "now()" },
      updatedAt: { type: "DateTime", default: "now()" }
    },
    indexes: [{ fields: ["name"], name: "idx_travel_type_name" }]
  },

  TravelMode: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },
      countryId: { type: "String", nullable: false },
      stateId: { type: "String", nullable: false },
      cityId: { type: "String", nullable: false },
      sightseeingId: { type: "String", nullable: true },
      travelTypeId: { type: "String", nullable: true },
      name: { type: "String", maxLength: 200, nullable: false },
      createdAt: { type: "DateTime", default: "now()" },
      updatedAt: { type: "DateTime", default: "now()" }
    },
    indexes: [{ fields: ["name"], name: "idx_travel_mode_name" }]
  }
};
