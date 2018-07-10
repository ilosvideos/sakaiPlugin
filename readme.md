Instructions for installing the VidGrid Sakai plugin beta (This assumes you are on Sakai 11)

1. Copy the VidGrid directory included in this zip to:
	
	{SAKAI_ROOT}/reference/library/src/webapp/editor/ckextraplugins

	this directory contains the VidGrid plugin javascript file (plugin.js)

2. At line 10 add your org api key.

    var orgApiKey = 'YOUR ORG API KEY';

3. Edit your ckeditor.launch.js file which can be found here

	{SAKAI_ROOT}\webapps\library\editor\

	You will need to change these lines:

		after 'toolbar_Full:' around line 158 you will need to add 'vidgrid',  to the two lists starting with sakai.editor.enableResourceSearch
			
		so that is looks something like this

            (sakai.editor.enableResourceSearch
                ? ['AudioRecorder','ResourceSearch', 'Image','Movie','Table','HorizontalRule','Smiley','SpecialChar','fmath_formula','FontAwesome', 'vidgrid']
                : ['AudioRecorder','Image','Movie','Table','HorizontalRule','Smiley','SpecialChar','fmath_formula','FontAwesome', 'vidgrid']),

		This is a list of the icons in your ckeditor and this will add the vidgrid icon to CKEditor

		next around line 218 you need to add this line

	    CKEDITOR.plugins.addExternal('vidgrid',basePath+'vidgrid/', 'plugin.js');

	    This tells ckeditor where to find the vidgrid plugin
	 
	    Finally, around line 235 you need to add the plugin itself to do that add
	 
	    	,vidgrid
	 
	    to the string following ckconfig.extraPlugins+=
	    
	    so for example ours reads
	 
	    ckconfig.extraPlugins+="image2,audiorecorder,movieplayer,wordcount,fmath_formula,autosave,fontawesome,notification,vidgrid";

4. Re-deploy the reference project.

    mvn clean install sakai:deploy -f reference/pom.xml
    mvn clean install sakai:deploy -f portal/pom.xml

Note: If you are having trouble editing your ckeditor.launch.js file we have also included a copy of ours in this zip
so that you can see what an example looks like. 

5. Configure Anti-Samy

Anti-Samy validates potentially dangerous scripts and prevents them from being stored in the
datastore, according to the security policy of Sakai.  This is a Sakai 10 new feature.  You need to
modify your antisamy policy files to allow CKEditor to use additional attributes.

Detect if you have high or low policies in your site (by default they are high)
Around line 906 of sakai.properties, check this line
#content.cleaner.default.low.security=true

If the line is commented or false, the antisamy security is high.
If the line is true (and uncommented), the antisamy security is low. If this is the case there's nothing else you need to do.

If the antisamy security is high.
check {CATALINA_ROOT}/antisamy/

if the directory doesn't exists, create one.
Inside check the file high-security-policy.xml

If the file doesn't exists copy the one from
{SAKAI_ROOT}/kernel/kernel-impl\target\classes\antisamy\high-security-policy.xml

Open the {CATALINA_ROOT}/antisamy/high-security-policy.xml file

Around line 123 add
app\.vidgrid\.com/embed|
after
download\.macromedia\.com/pub|

We included our file as an example. Do not use it directly as this will overwrite any other pollicies you might have.


