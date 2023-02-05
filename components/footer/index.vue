<template>
    <div class="bg-zinc-800 px-10 pt-10">
        <div class="flex justify-center gap-7 md:gap-0 items-center flex-col md:flex-row md:justify-between">
            <div>
                <div class="flex items-center ml-5 md:ml-0 md:gap-4 w-32">
                    <img src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674893527/logo_ik1lpf.png"
                        alt="GetSmurf Logo" class="h-20" />
                    <p class="text-3xl font-bold text-left">Get Smurfs</p>
                </div>
                <p class="text-sm md:pl-6">2023 GETSMURF, All Rights Reserved</p>
            </div>
            <div>
                <ul class="text-xl font-semibold text-center md:text-right">
                    <li>
                        <NuxtLink to="/contact">
                            Contact
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/privacy-policy">
                            Privacy Policy
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/terms-and-conditions">
                            Terms & Conditions
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <hr class="mx-2 md:mx-10 my-5 border-1 border border-gray-500" />

        <div class="text-center text-sm mx-2 md:mx-20 text-gray-200 pb-2">
            <p>
                GetSmurf.com is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or
                anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games
                are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
            </p>
        </div>
    </div>
</template>