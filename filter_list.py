# Define the structured list as a multiline string
hair_traits = """
makeup
eyeliner
eyeshadow
* blue_eyeshadow
* green_eyeshadow
* red_eyeshadow
* yellow_eyeshadow
forehead_mark
lip_balm
lipgloss
lipstick
* black_lipstick
* blue_lipstick
* green_lipstick
* orange_lipstick
* pink_lipstick
* striped_lipstick
* purple_lipstick
* red_lipstick
* white_lipstick
* yellow_lipstick
mascara
"""

# Split the string into lines and initialize an array to hold the results
lines = hair_traits.strip().split('\n')
traits_array = []

# Process each line
for line in lines:
    # Skip lines that should be ignored
    if line == '':
        continue
    # Replace underscores with spaces and remove any markdown-like characters
    clean_line = line.replace('_', ' ').replace('*', '').replace('~', '').strip()
    # Add the cleaned line to the array
    traits_array.append(clean_line)

# Print or return the result
print(traits_array)
