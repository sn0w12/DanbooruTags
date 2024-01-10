// Inject a textbox and a "Copy" button below the target element
function injectTextbox(targetElement, tags, textContent) {
    const currentDomain = window.location.hostname;
    const container = document.createElement('div');

    if (currentDomain === "danbooru.donmai.us") {
      const heading = document.createElement('h3');
      heading.textContent = textContent;
      container.appendChild(heading);
    }
    else if (currentDomain === "gelbooru.com") {
      const heading = document.createElement('b');
      heading.textContent = textContent;
      container.appendChild(heading);
    }

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

    
    container.appendChild(textboxContainer);

    // Add CSS styles to adjust the button height, corner style, and ensure container stays within parent element
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'stretch';
    container.style.overflow = 'hidden'; // Ensure content within the container is clipped if it exceeds the container's size
    if (currentDomain === "danbooru.donmai.us") {
      container.style.marginBottom = '10px'; // Add some bottom margin to prevent sticking out
    }
    container.style.marginTop = '10px';
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

    if (targetElement && targetElement.parentNode) {
      targetElement.insertAdjacentElement('afterend', container);
    } else {
        console.error('Target element not found or does not have a parent node');
    }

    // Resize the textbox when the window size changes
    window.addEventListener('resize', resizeTextbox);

    function resizeTextbox() {
        textbox.style.width = `${targetElement.offsetWidth - copyButton.offsetWidth - 10}px`;
    }

    // Initial resize
    resizeTextbox();
}

// Extract 'data-tag-name' values and populate the textbox
function extractAndPopulateTextbox() {
  const currentDomain = window.location.hostname;

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
    'licking', 'censored', 'mosaic censoring', 'web adress', 'alternate costume', 'web address'
  ];

  // Load options from storage and split into arrays
  chrome.storage.sync.get(['whitelistTags', 'blacklistTags'], function (result) {
    if (result.whitelistTags) {
      whitelistTags.push(...result.whitelistTags);
    }
    if (result.blacklistTags) {
      blacklistTags.push(...result.blacklistTags);
    }

    console.log(currentDomain);
    if (currentDomain === "danbooru.donmai.us") {
      const tags = [...document.querySelectorAll('.general-tag-list [data-tag-name]')]
        .map((element) => element.dataset.tagName.replace(/_/g, ' '))
        .filter((tag) => !blacklistTags.includes(tag));

      const nodes = document.querySelectorAll(".tag-type-0");
      var tagListElement = nodes[nodes.length- 1];

      console.log(tags);
      const positiveTags = whitelistTags.filter((tag) => tags.includes(tag));
      var modifiedTags = tags.map(modifyText);
      modifiedTags = positiveTags.length > 0 ? [...positiveTags, ...modifiedTags].join(', ') : modifiedTags.join(', ');
  
      injectTextbox(tagListElement, modifiedTags, 'Prompt');
    }
    else if (currentDomain === "gelbooru.com") {
      const tags = [...document.querySelectorAll('.tag-type-general a')]
        .map((tagElement) => tagElement.textContent.trim())
        .filter((tag) => tag !== "?")
        .filter((tag) => !blacklistTags.includes(tag));
      
      const nodes = document.querySelectorAll(".tag-type-general");
      var tagListElement = nodes[nodes.length- 1];
      console.log(tags);
      const positiveTags = whitelistTags.filter((tag) => tags.includes(tag));
      const modifiedTags = positiveTags.length > 0 ? [...positiveTags, ...tags].join(', ') : tags.join(', ');
  
      injectTextbox(tagListElement, modifiedTags, 'Prompt');
    }
  });
}

// Execute the extraction when the DOM is fully loaded
window.addEventListener('load', extractAndPopulateTextbox);

// Character Names
// Find all target HTML elements
const currentDomain = window.location.hostname;

function handleDomainDanbooru() {
  const targetElements = document.querySelectorAll('li.tag-type-4[data-tag-name]');
  console.log(targetElements);

  targetElements.forEach(targetElement => {
    const injectElement = targetElement.querySelector('span.post-count[title]');
    createCopyButton(targetElement, injectElement);
  });

  if (targetElements.length !== 1) {
    const nodes = document.querySelectorAll(".tag-type-4");
    const tagListElement = nodes[nodes.length - 1];
    const tags = [...document.querySelectorAll('.character-tag-list [data-tag-name]')]
      .map((element) => element.dataset.tagName.replace(/_/g, ' '));

    console.log(tags);
    const modifiedTags = tags.map(modifyText).join(', ') + ", ";
    injectTextbox(tagListElement, modifiedTags, 'All Characters');
  }
}

function handleDomainGelbooru() {
  const targetElements = document.querySelectorAll('.tag-type-character');
  console.log(targetElements);

  const tags = [...document.querySelectorAll('.tag-type-character a')]
    .map((tagElement) => tagElement.textContent.trim())
    .filter((tag) => tag !== "?");
  console.log(tags);

  targetElements.forEach((targetElement, index) => {
    const injectElement = targetElement.querySelector('li.tag-type-character span[style="color: #a0a0a0;"]');
    console.log(tags[index]);
    createCopyButton(tags[index], injectElement);
  });

  if (tags.length !== 1) {
    const nodes = document.querySelectorAll(".tag-type-character");
    const tagListElement = nodes[nodes.length - 1];
    const modifiedTags = tags.map(modifyText).join(', ') + ", ";
    injectTextbox(tagListElement, modifiedTags, 'All Characters');
  }
}

function createCopyButton(targetElement, injectElement) {
  const copyButton = document.createElement('button');
  const copyIcon = document.createElement('img');
  copyIcon.src = 'https://cdn-icons-png.flaticon.com/512/1621/1621635.png';
  copyIcon.alt = 'Copy';
  copyIcon.style.width = '13.33px';
  copyIcon.style.height = '13.33px';

  copyButton.style.width = '26.33px';
  copyButton.style.height = '21.5px';
  copyButton.style.borderRadius = '0px';
  copyButton.style.marginLeft = '10px';
  copyButton.style.alignItems = 'center';
  copyButton.style.justifyContent = 'center';
  copyButton.style.textAlign = 'center';
  copyButton.style.padding = '0px';
  copyButton.style.border = 'none';
  copyButton.style.fontFamily = 'Tahoma, Verdana, Helvetica, sans-serif';
  copyButton.appendChild(copyIcon);

  copyButton.addEventListener('click', () => {
    if (currentDomain === "danbooru.donmai.us") {
      const tagName = targetElement.dataset.tagName;
      const modifiedText = modifyText(tagName) + ', ';
      copyToClipboard(modifiedText);
    }
    else if (currentDomain === "gelbooru.com") {
      const tagName = targetElement;
      const modifiedText = modifyText(tagName) + ', ';
      copyToClipboard(modifiedText);
    }
  });

  injectElement.insertAdjacentElement('beforeend', copyButton);
}

// Function to modify the text as needed
function modifyText(text) {
  return text.replace('_', ' ').replace('(', '\\(').replace(')', '\\)');
}

// Main logic based on the current domain
if (currentDomain === "danbooru.donmai.us") {
  handleDomainDanbooru();
} else if (currentDomain === "gelbooru.com") {
  handleDomainGelbooru();
}

// Function to copy text to the clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}