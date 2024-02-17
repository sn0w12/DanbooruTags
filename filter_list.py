# Define the structured list as a multiline string
hair_traits = """
Tattoo

barcode_tattoo
butterfly_tattoo
dragon_tattoo
heart_tattoo
irezumi
number_tattoo
slave_tattoo
star_tattoo
tribal_tattoo
womb_tattoo

arm_tattoo
back_tattoo
* tramp_stamp
chest_tattoo
facial_tattoo
full_body_tattoo
leg_tattoo
neck_tattoo
pubic_tattoo
shoulder_tattoo
tattooed_breast
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
