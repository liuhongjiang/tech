* ganglia introdution
http://duanple.blog.163.com/blog/static/70971767201183092413177/

* who's using ganglia?
http://www.ehow.com/info_12209999_ganglia-vs-munin.html
Ganglia is used by Twitter, the San Diego Supercomputing Center, Industrial Light & Magic, Virginia Tech, Microsoft, NASA, National Institutes of Health, Harvard and CERN.
You can find on the right side of ganglia.info

* hadoop vs ganglia
http://wiki.apache.org/hadoop/GangliaMetrics

* ganglia how to [very good]
http://www.ibm.com/developerworks/wikis/display/WikiPtype/ganglia

* extend ganglia for more metrics
https://developer.nvidia.com/ganglia-monitoring-system

* Ganglia web example
http://ac.ncsa.uiuc.edu/ganglia/?m=load_one&r=week&s=descending&hc=4&mc=2
http://ganglia.wikimedia.org/latest/ [good]
from http://www.igvita.com/2010/01/28/cluster-monitoring-with-ganglia-ruby/

* plugin for gmond
One of the new features of Ganglia 3.1.x is the ability to create C/Python metric gathering modules. These modules can be plugged directly into gmond to monitor user-specified metrics.

* RRDtool
http://oss.oetiker.ch/rrdtool/index.en.html
Cunitor used Jrobin for storage and graphing, Jrobin is a java port of RRDtool, it's under LGPL 

* a blog for ganglia
http://www.igvita.com/2010/01/28/cluster-monitoring-with-ganglia-ruby/

* ganglia on Youtube
http://www.youtube.com/watch?v=RfvghKzVF_w

* sending alarm
http://munin-monitoring.org/wiki/HowToContact

* introduction to RRDtool
It's under GPL
given that you already have a nagios installation, consider nagiosgraph or pnp4nagios.

* nagios
http://www.nagios.org/

nagiosgraph and pnp4nagios do a pretty nice job of plotting nagios performance data. nagiosgraph has a parameter-based approach to configuration, pnp4nagios has a template-based approach.

    both automatically detect new hosts/services whenever the nagios configuration changes
    both do graph zooming
    both provide graphs when you mouseover specific hosts/services
    both provide many ways to slice and dice your data
    both detect and graph the critical and warning levels you have already defined in nagios
    both can be embedded directly into the nagios frame for seamless, uncluttered navigation from current status to history and back

slicing and dicing the data are pretty important, imho. for example, you can view all services on a single host, or view all hosts with a specific service, or view arbitrary collections of graphs for arbitrary hosts and services.

installation is not trivial, but not difficult. a lot depends on how much you want to customize things. for example, nagiosgraph is 'install.pl' or 'rpm -i nagiosgraph.rpm' or 'dpkg -i nagiosgraph.deb'. pnp4nagios is './configure; make; make install'.

n2rrd can do some of these things as well, but it is not as polished and requires more work to configure.

rrdtool has quirks wrt data storage, and any system will have sampling issues. rrdtool does some data smoothing by default, but you can capture (and graph) maximums and/or minimums in addition to averages if necessary.

every rrdtool-based approach suffers from data/graph staleness since the schema in each rrd file is static and most systems use the rrd filename to identify the data. data are typically never lost when a hostname or service name changes; the rrd files still exist on disk. but some user interfaces provide ways to see 'stale' rrd files, others require manual housekeeping via command line. on many installations this is only an issue when initially configuring the system, but in dynamic environments (e.g. monitoring virtual machines whose lifetime is only a few months) it can become tedious.

one final note. there are actually two parts to trending: data collection and data display. if you go with a standalone graphing system rather than extending your existing nagios installation, then you might have to install additional components on your windows machines in order to collect the data.

