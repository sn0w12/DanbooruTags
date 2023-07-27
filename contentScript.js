// Inject a textbox and a "Copy" button below the <section id="tag-list"> element
function injectTextbox(tagListElement, tags) {
    const container = document.createElement('div');

    const heading = document.createElement('h3');
    heading.textContent = 'Prompt';

    const textboxContainer = document.createElement('div');
    textboxContainer.style.display = 'flex';
    textboxContainer.style.alignItems = 'stretch';

    const textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.id = 'tagListOutput';
    textbox.value = tags;
    textbox.classList.add('flex-auto', 'ui-autocomplete-input');
    textbox.setAttribute('data-shortcut', 'q');
    textbox.setAttribute('data-autocomplete', 'tag-query');
    textbox.setAttribute('autocapitalize', 'none');
    textbox.setAttribute('autocomplete', 'off');
    textbox.setAttribute('title', 'Shortcut is q');
    textbox.style.fontFamily = 'Tahoma, Verdana, Helvetica, sans-serif'; // Set the font family

    const copyButton = document.createElement('button');

    // Add icon to the button
    const copyIcon = document.createElement('img');
    copyIcon.src = 'https://cdn-icons-png.flaticon.com/512/1621/1621635.png';
    copyIcon.alt = 'Copy';
    copyIcon.style.width = '13.33px'; // Adjust the width of the icon
    copyIcon.style.height = '13.33px'; // Adjust the height of the icon
    copyButton.appendChild(copyIcon);

    copyButton.addEventListener('click', () => {
        textbox.select();
        document.execCommand('copy');
    });
    copyButton.style.fontFamily = 'Tahoma, Verdana, Helvetica, sans-serif'; // Set the font family

    textboxContainer.appendChild(textbox);
    textboxContainer.appendChild(copyButton);

    container.appendChild(heading);
    container.appendChild(textboxContainer);

    // Add CSS styles to adjust the button height, corner style, and ensure container stays within parent element
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'stretch';
    container.style.overflow = 'hidden'; // Ensure content within the container is clipped if it exceeds the container's size
    container.style.marginBottom = '10px'; // Add some bottom margin to prevent sticking out
    container.style.width = '100%'; // Set the container's width to 100% to occupy the available space

    copyButton.style.flex = '0 0 auto';
    copyButton.style.width = '26.33px'; // Adjust the width of the copy button using a fixed value
    copyButton.style.height = '21.5px'; // Adjust the height of the copy button using a fixed value
    copyButton.style.borderRadius = '0';
    copyButton.style.display = 'flex';
    copyButton.style.alignItems = 'center';
    copyButton.style.justifyContent = 'center';
    copyButton.style.textAlign = 'center';
    copyButton.style.padding = '0';
    copyButton.style.border = 'none'; // Remove the border

    // Make the textbox and button the same height using flex-grow
    textbox.style.flexGrow = '1';
    copyButton.style.flexGrow = '0'; // Set flex-grow to 0 for the button to prevent it from expanding

    tagListElement.appendChild(container);

    // Resize the textbox when the window size changes
    window.addEventListener('resize', resizeTextbox);

    function resizeTextbox() {
        textbox.style.width = `${tagListElement.offsetWidth - copyButton.offsetWidth - 10}px`;
    }

    // Initial resize
    resizeTextbox();
}

// Extract 'data-tag-name' values and populate the textbox
function extractAndPopulateTextbox() {
  const tagListElement = document.getElementById('tag-list');
  if (!tagListElement) {
    console.error("Couldn't find the <section id='tag-list'> element.");
    return;
  }

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
    'jewelry', 'hoop earrings', 'stud earrings', 'bell earrings', 'cherry earrings',
    'crescent earrings', 'cross earrings', 'crystal earrings', 'flower earrings',
    'food-themed earrings', 'heart earrings', 'jack-o\'-lantern earrings',
    'magatama earrings', 'orange-shaped earrings', 'pill earrings', 'pineapple earrings',
    'planet earrings', 'pom pom earrings', 'potara earrings', 'shell earrings',
    'skull earrings', 'snowflake earrings', 'spade earrings', 'star earrings',
    'strawberry earrings', 'tassel earrings', 'yin yang earrings', 'adjusting earrings',
    'multiple earrings', 'gold earrings', 'silver earrings', 'aqua earrings',
    'black earrings', 'blue earrings', 'brown earrings', 'green earrings',
    'grey earrings', 'orange earrings', 'pink earrings', 'purple earrings',
    'red earrings', 'white earrings', 'yellow earrings', 'earrings', 'uncensored',
    'licking another\'s face', 'licking armpit', 'licking breast', 'licking cum',
    'licking dildo', 'licking ear', 'licking eye', 'licking finger', 'licking floor',
    'licking foot', 'licking hand', 'licking leg', 'licking navel', 'licking neck',
    'licking nipple', 'licking panties', 'licking penis', 'licking stomach',
    'licking testicle', 'licking weapon', 'bar censor', 'blank censor', 'blur censor',
    'glitch censor', 'heart censor', 'light censor', 'novelty censor', 'character censor',
    'text censor', 'flower censor', 'interface censor', 'speech bubble', 'english text',
    'licking', 'censored', 'mosaic censoring', 'tongue out', 'web adress', 'alternate costume', 'web address'
  ];

  // Load options from storage and split into arrays
  chrome.storage.sync.get(['whitelistTags', 'blacklistTags'], function (result) {
    if (result.whitelistTags) {
        whitelistTags.push(...result.whitelistTags);
    }
    if (result.blacklistTags) {
        blacklistTags.push(...result.blacklistTags);
    }

    const tags = [...document.querySelectorAll('.general-tag-list [data-tag-name]')]
        .map((element) => element.dataset.tagName.replace(/_/g, ' ').toLowerCase());

    console.log('All tags:', tags);
    console.log('Whitelisted tags:', whitelistTags);
    console.log('Blacklisted tags:', blacklistTags);

    // Remove blacklisted tags
    const filteredTags = tags.filter(tag => !blacklistTags.map(blackTag => blackTag.toLowerCase()).includes(tag));

    // Combine whitelisted tags and filtered tags
    const modifiedTags = [...whitelistTags, ...filteredTags];

    // Remove empty and undefined tags
    const cleanedTags = modifiedTags.filter(tag => tag);

    // Conditionally join the tags based on the presence of tags
    const tagListOutput = cleanedTags.length > 0 ? cleanedTags.join(', ') : '';

    const textbox = document.getElementById('tagListOutput');
    if (!textbox) {
        injectTextbox(tagListElement, tagListOutput);
    } else {
        textbox.value = tagListOutput;
    }
});
}

// Execute the extraction when the DOM is fully loaded
window.addEventListener('load', extractAndPopulateTextbox);