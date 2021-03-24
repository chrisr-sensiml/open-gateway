import sys
import os
from setuptools import setup, find_packages


__version__ = "2021.1.0"

# 'setup.py publish' shortcut.
if sys.argv[-1] == "publish":
    os.system("python setup.py sdist bdist_wheel")
    os.system("twine upload dist/*")
    sys.exit()

# 'setup.py test' shortcut.
# !pip install --index-url https://test.pypi.org/simple/ sensiml -U
if sys.argv[-1] == "test":
    os.system("python setup.py sdist bdist_wheel")
    os.system("twine upload --repository-url https://test.pypi.org/legacy/ dist/*")
    sys.exit()

setup(
    name="mikopa",
    description="An AI/IoT gateway for streaming and analyzing sensor data from edge nodes",
    version=__version__,
    author="Chris Knorowski",
    author_email="chris.knorowski@sensiml.com",
    url="https://github.com/sensiml/mikopa",
    license="BSD-3",
    classifiers=[
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
    ],
    packages=find_packages(exclude=["*test*", "mikopa_ui*"]),
    include_package_data=True,
    long_description=open("README.md").read(),
    install_requires=[
        "flask",
        "flask-wtf",
        "wtforms",
        "flask-cors",
        "pyserial>=2.6",
        "opencv-python",
        "mss",
        "numpy",
        "nest_asyncio",
        "bleak,
        "bluepy ; sys_platform == 'linux'",
    ],
)
