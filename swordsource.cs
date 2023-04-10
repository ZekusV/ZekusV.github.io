using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using Terraria.DataStructures;
using System.Linq;
using Terraria.Audio;
using Microsoft.Xna.Framework;
using System.Collections.Generic;

namespace ZMod.Vanity
{
    public class SwordVanityItem : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Sword Vanity Item"); // The name of the item
            Tooltip.SetDefault("Summons two floating swords that follow you around"); // The tooltip of the item
        }

        public override void SetDefaults()
        {
            Item.width = 94; // The width of the item sprite
            Item.height = 30; // The height of the item sprite
            Item.vanity = true; // This item is a vanity item
            Item.rare = ItemRarityID.Pink; // The rarity of the item
            Item.value = Item.sellPrice(gold: 10); // The value of the item in coins
        }

        public override void UpdateVanity(Player player, EquipType type)
        {
            if (player.whoAmI == Main.myPlayer) // If this is the local player
            {
                int leftSword = ModContent.ProjectileType<LeftSword>(); // Get the type of the left sword projectile
                int rightSword = ModContent.ProjectileType<RightSword>(); // Get the type of the right sword projectile

                if (player.FindBuffIndex(leftSword) == -1) // If the player does not have the left sword buff
                {
                    Projectile.NewProjectile(player.Center, player.velocity, leftSword, 0, 0f, player.whoAmI); // Spawn a new left sword projectile
                }

                if (player.FindBuffIndex(rightSword) == -1) // If the player does not have the right sword buff
                {
                    Projectile.NewProjectile(player.Center, player.velocity, rightSword, 0, 0f, player.whoAmI); // Spawn a new right sword projectile
                }
            }
        }
    }

    public class LeftSword : ModProjectile
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Left Sword"); // The name of the projectile
            Main.projFrames[projectile.type] = 1; // The number of frames in the projectile sprite
            Main.projPet[projectile.type] = true; // This projectile is a pet
        }

        public override void SetDefaults()
        {
            projectile.CloneDefaults(ProjectileID.ZephyrFish); // Clone the defaults of the Zephyr Fish pet
            aiType = ProjectileID.ZephyrFish; // Use the AI of the Zephyr Fish pet
            projectile.width = 40; // The width of the projectile sprite
            projectile.height = 40; // The height of the projectile sprite
        }

        public override bool PreAI()
        {
            Player player = Main.player[projectile.owner]; // Get the owner of this projectile
            player.zephyrfish = false; // Prevents the Zephyr Fish buff from being applied to the player
            return true;
        }

        public override void AI()
        {
            Player player = Main.player[projectile.owner]; // Get the owner of this projectile

            if (player.dead) // If the player is dead
            {
                player.GetModPlayer<SwordPlayer>().leftSword = false; // Set the left sword flag to false in the custom player class
            }

            if (player.GetModPlayer<SwordPlayer>().leftSword) // If the left sword flag is true in the custom player class
            {
                projectile.timeLeft = 2; // Reset the projectile time left to prevent it from dying
            }
        }
    }

    public class RightSword : ModProjectile
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Right Sword"); // The name of the projectile
            Main.projFrames[projectile.type] = 1; // The number of frames in the projectile sprite
            Main.projPet[projectile.type] = true; // This projectile is a pet
        }

        public override void SetDefaults()
        {
            projectile.CloneDefaults(ProjectileID.ZephyrFish); // Clone the defaults of the Zephyr Fish pet
            aiType = ProjectileID.ZephyrFish; // Use the AI of the Zephyr Fish pet
            projectile.width = 40; // The width of the projectile sprite
            projectile.height = 40; // The height of the projectile sprite
        }

        public override bool PreAI()
        {
            Player player = Main.player[projectile.owner]; // Get the owner of this projectile
            player.zephyrfish = false; // Prevents the Zephyr Fish buff from being applied to the player
            return true;
        }

        public override void AI()
        {
            Player player = Main.player[projectile.owner]; // Get the owner of this projectile

            if (player.dead) // If the player is dead
            {
                player.GetModPlayer<SwordPlayer>().rightSword = false; // Set the right sword flag to false in the custom player class
            }

            if (player.GetModPlayer<SwordPlayer>().rightSword) // If the right sword flag is true in the custom player class
            {
                projectile.timeLeft = 2; // Reset the projectile time left to prevent it from dying
            }
        }
    }

    public class SwordPlayer : ModPlayer
    {
        public bool leftSword; // A flag to indicate if the player has the left sword
        public bool rightSword; // A flag to indicate if the player has the right sword

        public override void ResetEffects()
        {
            leftSword = false; // Reset the left sword flag to false
            rightSword = false; // Reset the right sword flag to false
        }

        public override void UpdateVanityAccessories()
        {
            for (int i = 13; i < 18 + player.extraAccessorySlots; i++) // Loop through all the vanity accessory slots
            {
                Item item = player.armor[i]; // Get the item in the current slot

                if (item.type == ModContent.ItemType<SwordVanityItem>()) // If the item is the sword vanity item
                {
                    leftSword = true; // Set the left sword flag to true
                    rightSword = true; // Set the right sword flag to true
                    break; // Break out of the loop
                }
            }
        }
    }
}
