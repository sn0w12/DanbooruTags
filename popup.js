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
});