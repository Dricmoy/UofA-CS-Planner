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

        

        prereq = re.findall(r'Pre-?requisites?:\s*([A-Za-z0-9\s()]+)', lst[-1])
        coreq = re.findall(r'Co-?requisites?:\s*([A-Za-z0-9\s()]+)', lst[-1])

        prereq = standarize_req(prereq)
        coreq = standarize_req(coreq)

        class_desc.append([lst[0], lst[-1], prereq, coreq])

    return class_desc



def standarize_req(req): 
    #format:
    # [class 1, class 2, [class 3, class 4]]
    # class 1 and class 2 are manditory prereqs, and one of class 3 or 4 have to taken
    if req:
        req = req.upper()
        lst = re.split(r';|AND', req)
        standardized_lst = []
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

                faculty_name = elements[0][:-5]
                temp_lst = []
                for element in elements:
                    element = element.lstrip().rstrip()
                    element = faculty_name + " " + element[-3:]
                    element = element.lstrip().rstrip()
                    temp_lst.append(element)
                standardized_lst.append(temp_lst)

                
            else:
                elements = elements.lstrip().rstrip()
                standardized_lst.append(elements)
            

        return standardized_lst



    else:
        return None 

def get_class_numbers(class_):
    url = f'https://apps.ualberta.ca/catalogue/course/{class_}'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')







# Main function
def main():
    faculty_codes = ['ah', 'ar', 'au', 'bc', 'ed', 'en', 'et', 'ex', 'la', 'mh', 'ns', 'nu', 
    'pe', 'ph', 'ps', 'rm', 'sa', 'sc', 'ss']

    class_lst = []
    for code in faculty_codes:
        class_lst = class_lst + get_class_code(code)
        
    class_desc = {}

    for class_ in class_lst:
        class_desc[class_] = get_class_desc(class_.upper())
    

            
if __name__ == "__main__":
    main()