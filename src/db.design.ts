export const dbDesign = {
  Destination: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      destinationType: { 
        type: "Enum", 
        values: ["international", "domestic"], 
        nullable: false 
      },

      name: { type: "String", maxLength: 200, nullable: false },

      countryId: { type: "String", nullable: true },
      stateId: { type: "String", nullable: true },
      cityId: { type: "String", nullable: true },

      priceRange: { type: "String", maxLength: 100, nullable: true },

      thumbnailPhoto: { type: "String", nullable: true },
      bannerPhoto: { type: "String", nullable: true },
      video: { type: "String", nullable: true },

      createdAt: { type: "DateTime", default: "now()" },
      updatedAt: { type: "DateTime", default: "now()" }
    },

    indexes: [
      { fields: ["name"], name: "idx_destination_name" },
      { fields: ["destinationType"], name: "idx_dest_type" }
    ]
  }
};
