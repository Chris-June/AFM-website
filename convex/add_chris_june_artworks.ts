import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const addChrisJuneArtworks = mutation({
  args: {},
  handler: async (ctx) => {
    const artworks = [
      {
        title: "Al Pacino",
        artist: "chris june",
        description: "Charcoal illustration capturing the intensity and presence of Al Pacino.",
        storageId: "kg2apgas5dxzjjc1xbnh21k15185wwex" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Keanu Reaves",
        artist: "chris june",
        description: "Charcoal portrait of Keanu Reeves, exploring depth through light and shadow.",
        storageId: "kg24f0kp3yxyh6rna8j4900y0s85wq84" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Patrick Roy",
        artist: "chris june",
        description: "Charcoal illustration celebrating the legendary hockey goaltender Patrick Roy.",
        storageId: "kg288bfga6447qj5jgqh6kf0hh85xfdm" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Ali",
        artist: "chris june",
        description: "Charcoal portrait of Muhammad Ali, capturing the spirit of 'The Greatest.'",
        storageId: "kg2efscxy528a8jhewtda49vgs85wdqh" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Old Man",
        artist: "chris june",
        description: "Charcoal study of an elderly face, exploring the stories written in every wrinkle.",
        storageId: "kg2ekmehg15zfe4nrh9tv5b2v585wz7m" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Self Portrait",
        artist: "chris june",
        description: "A charcoal self-portrait exploring identity through the artist's own gaze.",
        storageId: "kg2fcs280e27aav7ev2b5n8w3s85wy9w" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Man & Car",
        artist: "chris june",
        description: "Charcoal composition exploring the relationship between humanity and machine.",
        storageId: "kg2dxzgmfkp5xxxpwthg93ggmn85x09r" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Self Portrait \"Chris\"",
        artist: "chris june",
        description: "An intimate charcoal self-portrait, revealing the artist beneath the surface.",
        storageId: "kg2fz6cpq6xp161jg6mgyv5yah85xmb1" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
      {
        title: "Female",
        artist: "chris june",
        description: "Charcoal portrait celebrating feminine grace and strength through expressive line work.",
        storageId: "kg291w1tcfq9qv8sxwdm8t8fnd85wtw8" as Id<"_storage">,
        type: "drawing" as const,
        attribution: "© Chris June, 2025. All rights reserved.",
        featured: true,
      },
    ];

    const insertedIds = [];
    
    for (const artwork of artworks) {
      const id = await ctx.db.insert("artworks", artwork);
      insertedIds.push(id);
    }
    
    return { 
      success: true, 
      count: insertedIds.length,
      message: `Successfully added ${insertedIds.length} Chris June artworks to the gallery.` 
    };
  },
});
