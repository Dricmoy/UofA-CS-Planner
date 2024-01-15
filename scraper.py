import requests
from bs4 import BeautifulSoup
import time
import re

# Function to fetch the HTML content of a URL
def get_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve the HTML content. Status code: {response.status_code}")
        return None

def get_class_code(faculty_code):
    url = f'https://apps.ualberta.ca/catalogue/faculty/{faculty_code}'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    
    if html:
        lst = [i.text for i in soup.find_all("a")]
        
        lst = [i for i in lst if '-' in i]

        return [i.split(' -')[0].replace(' ', '_') for i in lst]

def get_class_desc(cls):
    url = f'https://apps.ualberta.ca/catalogue/course/{cls}'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    
    classes = soup.find('div', class_='content').find('div', class_ = 'container').find_all('div', class_ = "mb-3 pb-3 border-bottom")

    class_desc = []
    for class_ in classes:
        lst = class_.text.strip().split('\n')
        lst = [i.strip() for i in lst if i != ''] #[course name, course desc]

        
        if lst[-1] == 'There is no available course description.':
            continue
        
        lst[0] = (lst[0].split(" -"))[0]

        
        prereq = re.findall(r'Pre-?requisites?:\s*([A-Za-z0-9\s(),-]+)', lst[-1], flags = re.IGNORECASE) 
        coreq = re.findall(r'Co-?requisites?:\s*([A-Za-z0-9\s(),-]+)', lst[-1], flags = re.IGNORECASE)
        #restrictions = re.findall(r'Credit \s*([A-Za-z0-9\s()]+)', lst[-1])
        #print(restrictions)
        prereq = standarize_req(prereq)
        coreq = standarize_req(coreq)

        class_desc.append([lst[0], lst[-1], prereq, coreq])

    return class_desc



def standarize_req(req): 
    #format:
    # [class 1, class 2, [class 3, class 4]]
    # class 1 and class 2 are manditory prereqs, and one of class 3 or 4 have to taken
    if req:
        
        patterns_to_remove = [
            r" or the equivalent",
            r"or their equivalents",
            r", or equivalent",
            r"or equivalent",
            r", or consent of Department",
            r" or consent of the Department",
            r" or consent of Department",
            r" and consent of the Department",
            r"consent of the instructor",
            r" or consent of the instructor",
            r", or with instructor",
            r" or consent of Instructor"
        ]

        combined_pattern = re.compile("|".join(map(re.escape, patterns_to_remove)))
        req = combined_pattern.sub("", req[0]).upper()
        print(req)
        
        if "ONE OF" in req:
            lst = re.split(r';|AND', req)
        else:
            lst = re.split(r';|AND|,', req)

        standardized_lst = []
        faculty_name = ''


        for elements in lst:

            temp_lst = []


            if "ONE OF" in elements:
                elements = (elements.split("ONE OF ")) [1]
                matches = re.findall(r'((?:(?!OR)\b[A-Za-z]+\b)(?:\s+[A-Za-z]+)?)?\s+(\d+)', elements)

                faculty_name = ''
                for match in matches:
                    match = list(match)
                    
                    if match[0] == '':
                        match[0] = faculty_name
                    else:
                        faculty_name = match[0]
                    
                    
                    temp_lst.append(f'{match[0]} {match[1]}')

                standardized_lst.append(temp_lst)
            
            elif "OR" in elements:
                elements = elements.split("OR")
                
                faculty_name = ''
                temp_lst = []
                for element in elements:
                    element = element.lstrip().rstrip()
                    
                    if len(element) > 4:
                        faculty_name = element[:-4]

                    else:
                        element = faculty_name + " " + element[-3:]
                    element = element.lstrip().rstrip()
                    temp_lst.append(element)
                standardized_lst.append(temp_lst)

                
            else:
                elements = elements.lstrip().rstrip()
                if len(elements) > 4:
                    faculty_name = elements[:-4]
                else:
                    elements = faculty_name + " " + elements[-3:]
                standardized_lst.append(elements)
            

        return standardized_lst

    else:
        return None 


def standarize_res():
    pass


def get_class_numbers(class_):
    """
    Retrieve the class numbers for a given class.

    Args:
        class_ (str): The class code.

    Returns:
        None
    """
    url = f'https://apps.ualberta.ca/catalogue/course/{class_}'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')

    








# Main function
def main():
    faculty_codes = ['ah', 'ar', 'au', 'bc', 'ed', 'en', 'et', 'ex', 'la', 'mh', 'ns', 'nu', 
    'pe', 'ph', 'ps', 'rm', 'sa', 'sc', 'ss']

    with open("test.txt", "w") as file:
        file.write(str(get_class_desc('cmput')))

    """
    class_lst = []
    for code in faculty_codes:
        class_lst = class_lst + get_class_code(code)
        
    class_desc = {}

    for class_ in class_lst:
        class_desc[class_] = get_class_desc(class_.upper())
    
    """
            
if __name__ == "__main__":
    main()