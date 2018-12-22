#!/usr/bin/env bash
set -e

BASEDIR=${BASEDIR:-/etc/letsencrypt}
LIVEDIR=${LIVEDIR:-${BASEDIR}/live}

CERTBOT="/usr/bin/certbot --text --webroot -w /var/lib/certbot/"
SYMLINK=/etc/nginx/ssl/latest

function fail ()
{
    (>&2 echo $@)
    exit 1
}

function log ()
{
    [ ${VERBOSE} -eq 0 ] || echo $@
}

TEMP=`getopt -o vCLR: --long verbose,nocert,nolink,noreload \
             -n 'certbot.sh' -- "$@"`

if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi

eval set -- "$TEMP"

VERBOSE=0
CERT=1
LINK=1
RELOAD=1
while true; do
  case "$1" in
    -v | --verbose ) VERBOSE=1; shift ;;
    -C | --nocert ) CERT=0; shift ;;
    -L | --nolink ) LINK=0; shift ;;
    -R | --noreload ) RELOAD=0; shift ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

[ ${VERBOSE} -eq 0 ] && CERTBOT="${CERTBOT} -q"

function install_link ()
{
    LATEST=$(ls -td1 ${LIVEDIR}/* | head -n1)
    log "Using live directory: ${LATEST}"
    rm -f ${SYMLINK}
    ln -sf ${LATEST} ${SYMLINK}
}

function certbot_init ()
{
    [ -n "${EMAIL}" ] || fail "EMAIL environment variable missing"
    [ -n "${DOMAINS}" ] || fail "DOMAINS environment variable missing"
    DOMAINS=$(eval echo $DOMAINS | sed -e "s| \+|,|g")

    log "Requesting initial certificate for ${DOMAINS}"
    ${CERTBOT} certonly ${TOS} --email ${EMAIL} -d ${DOMAINS}
}

function certbot_renew ()
{
    log "Renewing existing certificate"
    ${CERTBOT} renew
}
function certbot ()
{
    [ -d ${LIVEDIR} ] && certbot_renew || certbot_init
}

function reload_nginx ()
{
    log "Reloading nginx"
    nginx -s reload
}
 
[ ${CERT} -eq 0 ] || certbot
[ ${LINK} -eq 0 ] || install_link
[ ${RELOAD} -eq 0 ] || reload_nginx