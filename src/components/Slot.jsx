import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
// import { BiLike,BiChat, BiShare, } from '@chakra-ui/icons'

import { Image } from '@chakra-ui/react'
export default function Slot({image,email,content,name,location}) {
  return (
    <Card>
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image style={{height:"220px",width:"100%"}}
            src=
              {image}
            
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
          Food Donation Slot
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
           I Hello I have some food to share with you fellow
          </Heading>
          <Text color={'gray.500'}>
            {content}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{name}</Text>
            <Text color={'gray.500'}>{location}</Text>
          </Stack>
        </Stack>
        <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button flex='1' variant='ghost' >
      Like
    </Button>
    <Button flex='1' variant='ghost' >
      Comment
    </Button>
    <Button flex='1' variant='ghost' >
      Share
    </Button>
  </CardFooter>
      </Box>
      
    </Center>
    </Card>
    
  );
}