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
                // Reload the current tab after saving
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.reload(tabs[0].id);
                });

                // Close the popup after saving
                window.close();
            }
        );
    });

    // Add event listener for file selection
    loadFilesInput.addEventListener('change', function (event) {
        var fileList = event.target.files;

        // Remove existing file list
        fileListContainer.innerHTML = '';

        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];

            if (file.name.endsWith('.safetensors')) {
                // Create checkbox for each file
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = file.name;
                checkbox.classList.add('fileCheckbox');

                // Create label for checkbox
                var label = document.createElement('label');
                label.textContent = file.name;

                // Create file list item
                var listItem = document.createElement('div');
                listItem.classList.add('fileListItem');
                listItem.appendChild(checkbox);
                listItem.appendChild(label);

                // Add checkbox change event listener
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        // Add selected file to prompt
                        var prompt = document.getElementById('prompt');
                        var selectedFile = this.value;
                        prompt.textContent += selectedFile + ' <lora:' + selectedFile + ':1.0> ';
                    }
                });

                // Append file list item to file list container
                fileListContainer.appendChild(listItem);
            }
        }
    });
});
