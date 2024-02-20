// Inject a textbox and a "Copy" button below the target element
function injectTextbox(targetElement, tags, textContent) {
  const domainStyles = {
      "danbooru.donmai.us": {
          element: 'h3',
          marginBottom: '10px'
      },
      "gelbooru.com": {
          element: 'b',
          marginLeft: '13px'
      }
  };

  const currentDomain = window.location.hostname;
  const container = document.createElement('div');
  container.style = `display: flex; flex-direction: column; align-items: stretch; overflow: hidden; margin-top: 10px; width: 100%; ${domainStyles[currentDomain]?.marginBottom ? `margin-bottom: ${domainStyles[currentDomain].marginBottom};` : ''} ${domainStyles[currentDomain]?.marginLeft ? `margin-left: ${domainStyles[currentDomain].marginLeft};` : ''}`;

  if (domainStyles[currentDomain]) {
      const heading = document.createElement(domainStyles[currentDomain].element);
      heading.textContent = textContent;
      container.appendChild(heading);
  }

  const textboxContainer = document.createElement('div');
  textboxContainer.style = 'display: flex; align-items: stretch;';

  const textbox = document.createElement('input');
  const textboxStyleProperties = {
    fontFamily: 'Tahoma, Verdana, Helvetica, sans-serif',
  };

  // Conditionally add flexGrow: '1' if on danbooru.donmai.us
  if (currentDomain === "danbooru.donmai.us") {
      textboxStyleProperties.flexGrow = '1';
  }

  Object.assign(textbox.style, textboxStyleProperties);
  Object.assign(textbox, {
      type: 'text',
      id: 'tagListOutput',
      value: tags,
      className: 'flex-auto ui-autocomplete-input',
      autocapitalize: 'none',
      autocomplete: 'off',
      title: 'Shortcut is q'
  });
  textbox.setAttribute('data-shortcut', 'q');
  textbox.setAttribute('data-autocomplete', 'tag-query');

  const copyButton = document.createElement('button');
  copyButton.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png" alt="Copy" style="width: 13.33px; height: 13.33px;">`;
  copyButton.style = 'font-family: Tahoma, Verdana, Helvetica, sans-serif; flex: 0 0 auto; width: 26.33px; height: 21.5px; border-radius: 0; display: flex; align-items: center; justify-content: center; text-align: center; padding: 0; border: none;';

  copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(textbox.value);
        // Select the text in the textbox after copying
        textbox.select();
        // Optionally, you could also focus the textbox
        textbox.focus();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
  });

  textboxContainer.append(textbox, copyButton);
  container.appendChild(textboxContainer);

  if (targetElement && targetElement.parentNode) {
      targetElement.insertAdjacentElement('afterend', container);
  } else {
      console.error('Target element not found or does not have a parent node.');
      return;
  }

  const resizeTextbox = () => textbox.style.width = `${targetElement.offsetWidth - copyButton.offsetWidth - 10}px`;
  window.addEventListener('resize', resizeTextbox);
  resizeTextbox();
}

// Extract 'data-tag-name' values and populate the textbox
function extractAndPopulateTextbox() {
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
    'licking', 'censored', 'mosaic censoring', 'web adress', 'alternate costume', 'web address', 'dated'
  ];

  // Load options from storage and split into arrays
  chrome.storage.sync.get(['whitelistTags', 'blacklistTags'], function (result) {
    if (result.whitelistTags) {
      whitelistTags.push(...result.whitelistTags);
    }
    if (result.blacklistTags) {
      blacklistTags.push(...result.blacklistTags);
    }

    // Assuming additionalExclusionList is defined
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
    'Raccoon ears', 'Reindeer ears', 'Sheep ears', 'Squirrel ears', 'Tiger ears', 'Wolf ears', 'alpaca ears', 'tan', 'tanline', 'sharp teeth'];

    // Extend the domainConfig with an optional additional tag filter step
    const domainConfig = {
      "danbooru.donmai.us": {
        querySelector: '.general-tag-list [data-tag-name]',
        tagListSelector: '.tag-type-0',
        tagNameProcessor: (element) => element.dataset.tagName.replace(/_/g, ' ')
      },
      "gelbooru.com": {
        querySelector: '.tag-type-general a',
        tagListSelector: '.tag-type-general',
        tagNameProcessor: (tagElement) => tagElement.textContent.trim(),
        tagFilter: (tag) => tag !== "?"
      }
    };

    const currentDomain = window.location.hostname;
    const config = domainConfig[currentDomain];

    if (config) {
      let tags = [...document.querySelectorAll(config.querySelector)]
        .map(config.tagNameProcessor)
        .filter((tag) => config.tagFilter ? config.tagFilter(tag) : true)
        .filter((tag) => !blacklistTags.includes(tag));

      const positiveTags = whitelistTags.filter((tag) => tags.includes(tag));
      let modifiedTags = tags.map(modifyText);
      if (currentDomain === "danbooru.donmai.us") {
        modifiedTags = positiveTags.length > 0 ? [...positiveTags, ...modifiedTags] : modifiedTags;
      } else { // For gelbooru.com
        modifiedTags = positiveTags.length > 0 ? [...positiveTags, ...tags] : tags;
      }
      modifiedTags = modifiedTags.join(', ');

      // Filtering out additional criteria from tags
      const filteredTags = tags
        .filter(tag => !additionalExclusionList.some(exclusion => tag.includes(exclusion.toLowerCase())))
        .join(', ');

      const excludedTags = tags.filter(tag => additionalExclusionList.some(exclusion => tag.includes(exclusion.toLowerCase())));

      // Identifying the last tag list element
      const nodes = document.querySelectorAll(config.tagListSelector);
      const tagListElement = nodes[nodes.length - 1];

      // Inject the textbox for excluded tags if there are any
      if (excludedTags.length > 0) {
        const excludedTagsString = excludedTags.join(', ');
        injectTextbox(tagListElement, modifyText(excludedTagsString), 'Character Tags');
      }

      // Injecting the second textbox with filtered tags, it will be injected first and then the next will be injected over this
      injectTextbox(tagListElement, modifyText(filteredTags), 'Filtered Tags');

      // Injecting the first textbox with modified tags
      injectTextbox(tagListElement, modifyText(modifiedTags), 'Prompt');
    }
  });
}

// Execute the extraction when the DOM is fully loaded
window.addEventListener('load', extractAndPopulateTextbox);

// Character Names
// Find all target HTML elements
const currentDomain = window.location.hostname;

function handleDomainDanbooru() {
  const allTags = new Set();

  const processTags = (tagType, tagListSelector) => {
    const targetElements = document.querySelectorAll(`li.${tagType}[data-tag-name]`);

    targetElements.forEach(targetElement => {
      const injectElement = targetElement.querySelector('span.post-count[title]');
      createCopyButton(targetElement, injectElement);
    });

    const tags = [...document.querySelectorAll(`${tagListSelector} [data-tag-name]`)]
      .map(element => element.dataset.tagName.replace(/_/g, ' '));

    tags.forEach(tag => allTags.add(tag));
  };

  processTags('tag-type-4', '.character-tag-list');
  processTags('tag-type-3', '.copyright-tag-list');

  if (allTags.size > 0) {
    const modifiedTags = [...allTags].map(modifyText).join(', ');
    const lastTagType4Element = document.querySelector('.flex.tag-type-4:last-of-type');
    if (lastTagType4Element) {
      injectTextbox(lastTagType4Element, modifiedTags, 'Character & Copyright');
    } else {
      console.warn('No .flex.tag-type-4:last-of-type element found');
    }
  } else {
    console.warn('No tags collected to inject');
  }
}

function handleDomainGelbooru() {
  // Select all elements with class 'tag-type-character'
  const targetElements = document.querySelectorAll('.tag-type-character');

  // Extract and log tag names, excluding any that are "?"
  const tags = Array.from(targetElements).map(targetElement => {
    // Assuming the first <a> tag within each element is the relevant tag
    const tagElement = targetElement.querySelector('a:not([href*="wiki"])'); // Exclude wiki links if they always use "?"
    return tagElement ? tagElement.textContent.trim() : null;
  }).filter(tag => tag !== null && tag !== "?");

  // Assuming 'createCopyButton' is a function to inject a "Copy" button next to each tag
  targetElements.forEach((element, index) => {
    if (tags[index]) { // Check if tag exists to avoid errors
      createCopyButton(tags[index], element); // Adjusted to inject the button directly into the target element
    }
  });

  // Inject a textbox with all character tags at the end if there are more than one.
  if (tags.length > 1) {
    const tagListElement = targetElements[targetElements.length - 1];
    const modifiedTags = tags.map(tag => modifyText(tag)).join(', ') + ", "; // Assuming 'modifyText' modifies the tag text
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