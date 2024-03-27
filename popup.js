document.addEventListener('DOMContentLoaded', function () {
    var whitelistTagsInput = document.getElementById('whitelistTags');
    var blacklistTagsInput = document.getElementById('blacklistTags');
    var saveButton = document.getElementById('saveBtn');
    var loadFilesInput = document.getElementById('loadFilesInput');
    var fileListContainer = document.getElementById('fileList');

    // Load saved options from storage and populate the textboxes
    chrome.storage.sync.get(['whitelistTags', 'blacklistTags'], function (result) {
        whitelistTagsInput.value = result.whitelistTags || '';
        blacklistTagsInput.value = result.blacklistTags || '';
    });

    // Save the options when the Save button is clicked
    saveButton.addEventListener('click', function () {
        var whitelistTags = whitelistTagsInput.value.trim().split(',');
        var blacklistTags = blacklistTagsInput.value.trim().split(',');

        // Remove leading and trailing spaces from each tag
        whitelistTags = whitelistTags.map(function (tag) {
            return tag.trim();
        });
        blacklistTags = blacklistTags.map(function (tag) {
            return tag.trim();
        });

        // Save the options to storage
        chrome.storage.sync.set(
            {
                whitelistTags: whitelistTags,
                blacklistTags: blacklistTags,
            },
            function () {
                // Check the current tab's URL before deciding to reload
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    var currentURL = new URL(tabs[0].url);
                    var hostname = currentURL.hostname;
                    
                    // Only reload if on danbooru.donmai.us or gelbooru.com
                    if (hostname === "danbooru.donmai.us" || hostname === "gelbooru.com") {
                        chrome.tabs.reload(tabs[0].id);
                    }

                    // Close the popup after saving
                    window.close();
                });
            }
        );
    });

    const domainConfig = {
        "example.com": { // This would not be used since we're getting input from a textbox, but kept for structure
            tagNameProcessor: (tag) => tag, // Directly use tag as input does not need querying and extraction
            tagFilter: (tag) => tag !== "?",
        }
    };

    // Modify this function as needed for your tag modification logic
    function modifyText(text) {
        // Example modification logic
        return text.replace(/_/g, ' ');
    }

    function processAndPopulateTags() {
        // Extract user input
        const userInput = document.getElementById('userTags').value;
        const rawTags = userInput.split(',').map(tag => tag.trim());

        const whitelistTags = [];
        const blacklistTags = [
            'artist name', 'character name', 'copyright name', 'company name', 'group name',
            'twitter logo', 'twitter username', 'signature',
            'patreon logo', 'patreon username', 'signature',
            'weibo logo', 'weibo username', 'signature',
            'deviantart logo', 'deviantart username', 'signature',
            'instagram logo', 'instagram username', 'signature',
            'tumblr logo', 'tumblr username', 'signature',
            'pixiv logo', 'pixiv username', 'signature',
            'facebook logo', 'facebook username', 'signature',
            'fanbox logo', 'fanbox username', 'signature',
            'gumroad logo', 'gumroad username', 'signature',
            'artstation logo', 'artstation username', 'signature',
            'lofter logo', 'lofter username', 'signature',
            'furaffinity logo', 'furaffinity username', 'signature',
            'youtube logo', 'youtube username', 'signature',
            'reddit logo', 'reddit username', 'signature',
            'naver logo', 'naver username', 'signature',
            'twitch logo', 'twitch username', 'signature',
            'pawoo logo', 'pawoo username', 'signature',
            'fantia logo', 'fantia username', 'signature',
            'plurk logo', 'plurk username', 'signature',
            'artist logo', 'artist username', 'signature',
            'bar censor', 'blank censor', 'blur censor',
            'glitch censor', 'heart censor', 'light censor', 'novelty censor', 'character censor',
            'text censor', 'flower censor', 'interface censor', 'speech bubble', 'english text',
            'licking', 'censored', 'mosaic censoring', 'web adress', 'alternate costume', 'web address', 'dated',
            'korean text'
        ];

        chrome.storage.sync.get(['whitelistTags', 'blacklistTags'], function (result) {
            if (result.whitelistTags) {
                whitelistTags.push(...result.whitelistTags);
            }
            if (result.blacklistTags) {
                blacklistTags.push(...result.blacklistTags);
            }

            const additionalExclusionList = ['Alternate hair color', 'Aqua hair', 'Black hair', 'Blonde hair', 'Blue hair', 'Brown hair', 'Light brown hair', 'Green hair', 'Grey hair', 
            'Orange hair', 'Pink hair', 'Purple hair', 'Lavender hair', 'Red hair', 'Silver hair', 'White hair', 'Multicolored hair', 'Gradient hair', 'Highlights', 'Two-tone hair', 
            'Rainbow hair', 'Colored inner hair', 'Uncolored hair roots', 'Very short hair', 'Short hair', 'Long hair', 'Very long hair (/vlh)', 'Absurdly long hair', 'Big hair', 'Bald', 
            'Bald girl', 'Asymmetrical Hair', 'Side Shave', 'Undercut', 'Alternate hairstyle', 'Hair down', 'Hair up', 'Curly hair', 'Ringlets', 'Drill hair', 'Twin drills', 'Flipped hair', 
            'Messy hair', 'Pointy hair', 'Spiked hair', 'Wavy hair', 'Finger wave', 'Bangs', 'Asymmetrical bangs', 'Baby bangs', 'Blunt bangs', 'Bumper bangs', 'Fringe', 'Hair over eyes', 
            'Hair over one eye /hooe', 'Parted bangs', 'Swept bangs', 'Curtained hair', 'Hair between eyes', 'Hair intakes', 'Payot', "Widow's peak", 'Ahoge', 'Heart ahoge', 'Huge ahoge', 
            'Antenna hair', 'Fauxhawk', 'Hair slicked back', 'Mohawk', 'Side Part', 'Victory Rolls', 'Zigzag Part', 'hair censor', 'Hair bikini', 'Hair in mouth', 'Hair scarf', 
            'Braid', 'Crown braid', 'Dutch braid', 'Fishtail braid', 'Front braid', 'Side braid', 'French braid', 'Single braid', 'Multiple braids', 
            'Ladder braid', 'Twin braids', 'Tri braids', 'Quad braids', 'Fauxhawk', 'Hair bun', 'Braided bun', 'Double bun', 'Hair rings', 'Half updo', 'One side up', 'Two side up', 
            'Low-tied long hair', 'Multi-tied hair', 'Ponytail', 'Front ponytail', 'High ponytail', 'Short ponytail', 'Side ponytail', 'Topknot', 'Twintails', 'Low twintails', 
            'Short twintails', 'Uneven twintails', 'Tri tails', 'Quad tails', 'Quin tails', 'Bob cut', 'Bowl cut', 'Buzz cut', 'Crew cut', 'Pixie cut', 'Quiff', 'Cornrows', 'Hairlocs', 
            'Hime cut', 'Mullet', 'Ringlets', 'Afro', 'Huge afro', 'Pompadour', 'Shouten pegasus mix mori', 'Aqua eyes', 'Black eyes', 'Blue eyes', 'Brown eyes', 'Amber eyes', 'Light Brown eyes', 
            'Gold eyes', 'Green eyes', 'Grey eyes', 'Hazel eyes', 'Orange eyes', 'Pink eyes', 'Purple eyes', 'Lavender eyes', 'Red eyes', 'Maroon eyes', 'Silver eyes', 'White eyes', 'Yellow eyes', 
            'Hazel eyes', 'Heterochromia', 'Multicolored eyes', 'Blue sclera', 'Black sclera', 'Bloodshot eyes', 'Green sclera', 'Grey sclera', 'Orange sclera', 'Pink sclera', 'Red sclera', 'Yellow sclera', 
            'Mismatched sclera', 'Flat chest', 'Small breasts', 'Medium breasts', 'Large breasts', 'Huge breasts', 'Gigantic breasts', 'dark-skinned female', 'dark skin', 'makeup', 'eyeliner', 'eyeshadow', 
            'blue eyeshadow', 'green eyeshadow', 'red eyeshadow', 'yellow eyeshadow', 'forehead mark', 'lip balm', 'lipgloss', 'lipstick', 'black lipstick', 'blue lipstick', 'green lipstick', 'orange lipstick', 
            'pink lipstick', 'striped lipstick', 'purple lipstick', 'red lipstick', 'white lipstick', 'yellow lipstick', 'mascara', 'aged up', 'body freckles', 'freckles', 'wide hips', 'ringed eyes', 'medium hair', 
            'greyscale', 'monochrome', 'curvy', 'hair ornament', 'x hair ornament', 'japanese text', 'hair ribbon', 'ribbon', 'yellow ribbon', 'Tattoo', 'barcode tattoo', 'butterfly tattoo', 'dragon tattoo', 
            'heart tattoo', 'irezumi', 'number tattoo', 'slave tattoo', 'star tattoo', 'tribal tattoo', 'womb tattoo', 'arm tattoo', 'back tattoo', 'tramp stamp', 'chest tattoo', 'facial tattoo', 
            'full body tattoo', 'leg tattoo', 'neck tattoo', 'pubic tattoo', 'shoulder tattoo', 'tattooed breast', 'fortissimo', 'musical note', 'treble clef', 'virtual youtuber',
            'elf', 'pointy ears', 'alternate breast size', 'asymmetrical horns', 'horns', 'demon horns', 'mole', 'mole under eye', 'animal ears', 'animal ear piercing', 'lion ears', 'lion girl',
            'head wings', 'hair wings', 'fox girl', 'fox ears', 'cat ears', 'dog ears', 'bunny ears', 'wolf ears', 'mouse ears', 'cow ears', 'Bat ears', 'Bear ears', 'Bunny ears', 'Cow ears',
            'Deer ears', 'Dog ears', 'Ermine ears', 'Ferret ears', 'Goat ears', 'Horse ears', 'Kemonomimi mode', 'Monkey ears', 'Mouse ears', 'Panda ears', 'Pikachu ears', 'Pig ears', 
            'Raccoon ears', 'Reindeer ears', 'Sheep ears', 'Squirrel ears', 'Tiger ears', 'Wolf ears', 'alpaca ears', 'tan', 'tanline', 'sharp teeth', 'blunt ends', 'glasses', 'colored skin', 'purple skin',
            'scar', 'animal ear fluff', 'black nails', 'fang', 'fox tail', 'red halo', 'tail', 'halo', 'angel wings', 'feathered wings', 'white wings', 'wings', 'curved horns', 'draph'
            ];

            const config = domainConfig["example.com"];

            let tags = rawTags
                .map(config.tagNameProcessor)
                .filter(tag => config.tagFilter ? config.tagFilter(tag) : true)
                .filter(tag => !blacklistTags.includes(tag));

            const positiveTags = whitelistTags.filter(tag => tags.includes(tag));
            let modifiedTags = tags.map(modifyText);

            // The domain-specific logic would likely not apply here, but kept for structure
            modifiedTags = positiveTags.length > 0 ? [...positiveTags, ...modifiedTags] : modifiedTags;
            modifiedTags = modifiedTags.join(', ');

            // Filtering out additional criteria from tags
            const filteredTags = tags
                .filter(tag => !additionalExclusionList.some(exclusion => tag.toLowerCase() === exclusion.toLowerCase()))
                .join(', ');

            const excludedTags = tags.filter(tag => additionalExclusionList.some(exclusion => tag.toLowerCase() === exclusion.toLowerCase()));

            // Populate textboxes
            document.getElementById('characterTagsOutput').value = excludedTags.join(', ');
            document.getElementById('filteredTagsOutput').value = filteredTags;
            document.getElementById('promptOutput').value = modifiedTags;
        });
    }

    document.getElementById('processBtn').addEventListener('click', processAndPopulateTags);
});
