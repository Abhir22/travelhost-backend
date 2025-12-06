export const dbDesign = {

  RoomType: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      name: { type: "String", maxLength: 200, nullable: false },
      description: { type: "Text", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },

    indexes: [
      { fields: ["name"], name: "idx_room_type_name" }
    ]
  },

  HotelRoom: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      hotelId: { type: "String", nullable: false },
      roomTypeId: { type: "String", nullable: false },

      roomNumber: { type: "String", maxLength: 50, nullable: false },
      description: { type: "Text", nullable: true },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },

    relations: {
      hotel: {
        type: "Hotel",
        relation: "many-to-one",
        foreignKey: "hotelId",
        onDelete: "CASCADE"
      },

      roomType: {
        type: "RoomType",
        relation: "many-to-one",
        foreignKey: "roomTypeId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["hotelId", "roomNumber"], name: "idx_hotel_room_unique" }
    ]
  },

  RoomImage: {
    columns: {
      id: { type: "String", primary: true, randomUUID: true, nullable: false },

      hotelRoomId: { type: "String", nullable: false },

      imageUrl: { type: "String", nullable: false },

      createdAt: { type: "DateTime", default: "now()", nullable: false },
      updatedAt: { type: "DateTime", default: "now()", nullable: false }
    },

    relations: {
      hotelRoom: {
        type: "HotelRoom",
        relation: "many-to-one",
        foreignKey: "hotelRoomId",
        onDelete: "CASCADE"
      }
    },

    indexes: [
      { fields: ["hotelRoomId"], name: "idx_room_image_room" }
    ]
  }

};
